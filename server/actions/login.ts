'use server'
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"
import { db } from '@/prisma/db'

export const login = actionClient
	.schema(loginFormSchema)
	.action(async ({ parsedInput: {  email, password, code } }) => {
		console.log('logging in')
		const existingUser = await db.user.findFirst({
			where: {
				email
			}
		})
		if(!existingUser){
			return { error: 'User not found'}
		}

		if(!existingUser.email){
			return { error: 'Email not found'}
		}

		if(!existingUser.emailVerified){
			return { error: 'Email not verified'}
		}

		console.log( 'success on login', email, password, code)
		return { success: 'Login successful'}
	})



