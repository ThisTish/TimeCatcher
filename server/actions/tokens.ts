"use server"

import { db } from '@/prisma/db'
import crypto from 'crypto'

export const generateVerificationToken = async (email: string) => {
	const existingVerificationToken = await db.verificationToken.findFirst({
		where: {
			email
		}
	})
	if (existingVerificationToken) {
		await db.verificationToken.delete({
			where: {
				id_token: {
					id: existingVerificationToken.id,
					token: existingVerificationToken.token
				}
			}
		})
	}
	const newVerificationToken = await db.verificationToken.create({
		data: {
			id: crypto.randomUUID(),
			email,
			token: crypto.randomUUID(),
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
		}
	})
	return newVerificationToken
}


export const newVerification = async (token: string) => {
	const existingVerificationToken = await db.verificationToken.findFirst({
		where: {
			token
		}
	})
	if (!existingVerificationToken) return { error: 'Verification token is invalid' }

	if (existingVerificationToken.expires < new Date()) return { error: 'Verification token has expired' }

	const existingUser = await db.user.findFirst({
		where: {
			email: existingVerificationToken.email
		}
	})
	if (!existingUser) return { error: 'Could not find user to verify' }

	await db.user.update({
		where: {
			email: existingUser.email
		},
		data: {
			emailVerified: new Date()
		}
	})

	await db.verificationToken.delete({
		where: {
			id_token: {
				id: existingVerificationToken.id,
				token: existingVerificationToken.token
			}
		}
	})

	return { success: 'Email successfully verified' }
}

