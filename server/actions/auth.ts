import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma/db"
import Credentials from 'next-auth/providers/credentials'
import {loginFormSchema} from "@/lib/types"
import { User } from "@prisma/client"

import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import Github from "next-auth/providers/github"
import LinkedIn from "next-auth/providers/linkedin"
import { compare } from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	secret: process.env.AUTH_SECRET,
	session:{
		strategy:'jwt'
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
			authorize: async (credentials) =>{
				const validationFields = loginFormSchema.safeParse(credentials)

				if(validationFields.success){
					const user = await db.user.findFirst({
						where: {
							email: validationFields.data.email
						}
					})
					if(!user || !user.password) return null

					const passwordMatch = await compare(validationFields.data.password, user.password)
					if(passwordMatch) return user
				}
				return null
			}
		})
	]
})