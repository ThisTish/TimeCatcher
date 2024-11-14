'use server'
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"
import { db } from '@/prisma/db'
import { hash } from 'bcrypt'
import { signIn } from 'next-auth/react'
import { generateVerificationToken } from './tokens'
import { sendVerificationEmail } from './emails'
import { AuthError } from 'next-auth'

export const login = actionClient
	.schema(loginFormSchema)
	.action(async ({ parsedInput: { email, password, code } }) => {
		console.log('logging in')
		try {
			const existingUser = await db.user.findFirst({
				where: {
					email
				}
			})
			if (!existingUser) {
				return { error: 'User not found' }
			}

			if (existingUser.email !== email ) {
				return { error: 'Email not found' }
			}

			if (!existingUser.emailVerified) {
				const verificationToken = await generateVerificationToken(existingUser.email)
				await sendVerificationEmail(existingUser.email, verificationToken.token)
				return { error: 'Email not verified, check inbox for new verification email' }
			}

			if (!existingUser.password) {
				return { error: "Error with password" }
			}

			// const hashedPassword = existingUser.password = await hash(existingUser.password, 10)

			await signIn('credentials', {
				email,
				password,
				return: false
			})

			console.log( 'success on login', email, password, code)
			return { success: 'Login successful, redirecting to login page...' }
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.message) {
					case 'CredentialsSignin': {
						return { error: 'Error with credentials' }
					}
					default: {
						return { error: 'Error logging in' }
					}
				}
			}
		}
	
})



