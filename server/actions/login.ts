"use server"
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"
import { db } from '@/prisma/db'
import { signIn } from '@/server/actions/auth'
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
			console.log('existing user', existingUser)
			if (!existingUser) {
				return { error: 'User not found' }
			}


			if (!existingUser.emailVerified) {
				const verificationToken = await generateVerificationToken(existingUser.email)
				await sendVerificationEmail(existingUser.email, verificationToken.token)
				return { error: 'Email not verified, check inbox for new verification email' }
			}
			console.log( 'success on login1', email, password, code)

			await signIn('credentials', {
				email,
				password,
				redirect: false
			})
			
			console.log( 'success on login2', email, password, code)
			return { success: 'Login successful, redirecting to login page...' }
		} catch (error) {
			console.log('error in logging in', error)
			if (error instanceof AuthError) {
				switch (error.message) {
					case 'CredentialsSignin': {
						return { error: 'Invalid email or password. Please try again.' }
					}
					default: {
						return { error: `Error logging in: ${error.message}` }
					}
				}
			}
		}
})



