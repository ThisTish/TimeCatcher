import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma/db"
import Credentials from 'next-auth/providers/credentials'
import { loginFormSchema } from "@/lib/types"

import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import Github from "next-auth/providers/github"
import LinkedIn from "next-auth/providers/linkedin"
import { compare } from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	// might have to add a next-auth.d.ts
	callbacks: {
		async session({ session, token }) {
			if (session && token.sub) {
				session.user.id = token.sub
			}
			if (session.user) {
				session.userId = session.user.id.toString()
				session.user.name = session.user.name as string
				session.user.image = session.user.image as string
			}
			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token
			const existingUser = await db.user.findFirst({
				where: {
					id: token.sub
				}
			})
			if (!existingUser) return token

			const existingAccount = await db.account.findFirst({
				where: {
					userId: existingUser.id
				}
			})

			token.name = existingUser.name
			token.email = existingUser.email
			token.image = existingUser.image

			return token
		}
	},
		providers: [
			Google({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET
			}),
			Discord({
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET
			}),
			Github({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET
			}),
			// linkedin network error, but seems to be connecting fine
			LinkedIn({
				clientId: process.env.LINKEDIN_CLIENT_ID,
				clientSecret: process.env.LINKEDIN_CLIENT_SECRET
			}),
			Credentials({
				type: 'credentials',
				credentials: {
					email: { label: "Email", type: "text" },
					password: { label: "Password", type: "password" }
				},
				authorize: async (credentials) => {
					const validationFields = loginFormSchema.safeParse(credentials)

					if (validationFields.success) {
						const user = await db.user.findFirst({
							where: {
								email: validationFields.data.email
							}
						})
						if (!user || !user.password) return null

						const passwordMatch = await compare(validationFields.data.password, user.password)
						if (passwordMatch) return user
					}
					return null
				}
			})
		]
	})