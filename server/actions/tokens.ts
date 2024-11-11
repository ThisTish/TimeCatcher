"use server"

import { db } from '@/prisma/db'
import crypto from 'crypto'
import { date } from 'zod'

export const generateVerificationToken = async (email: string) => {
	const existingVerificationToken = await db.verificationToken.findFirst({
		where:{
			email
		}
	})
	if(existingVerificationToken){
		await db.verificationToken.delete({
			where:{
				id_token: {
					id: existingVerificationToken.id,
					token: existingVerificationToken.token
				}
			}
		})
		// todo try catch to find error, breaking here i beleieve
	}
	const newVerificationToken = await db.verificationToken.create({
		data:{
			id: crypto.randomUUID(),
			email,
			token: crypto.randomUUID(),
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
		}
	})
	return newVerificationToken

}
