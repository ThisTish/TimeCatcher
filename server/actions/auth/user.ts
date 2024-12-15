import { db } from "@/prisma/db"
import { sendVerificationEmail } from "./emails"
import { generateVerificationToken } from "./tokens"

export const findUserByEmail = async (email: string) => {
	const existingUser = await db.user.findFirst({
		where: {
			email
		}
	})
	if (existingUser) {
		if (!existingUser.emailVerified) {
			const newVerificationToken = await generateVerificationToken(email)
			await sendVerificationEmail(newVerificationToken.email, newVerificationToken.token)
		}
		return { error: 'Email already in use' }
	}
	return existingUser
}

