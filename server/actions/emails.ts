'use server'

import { getBaseUrl } from '@/lib/baseUrl'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseUrl()

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`

	const { data, error } = await resend.emails.send({
		from: 'The Creator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com', //{email}
		subject: 'Verify your email with TimeCatcher',
		html: `<p><a href=${confirmLink}>Click Here</a> to verify ${email}</p>`,
		// react: <EmailVerification /> // design email component
	})
	if (error) return { error: error.message }
	if (data) return { data }
}


export const sendResetPasswordEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/reset-password?token=${token}`

	const { data, error } = await resend.emails.send({
		from: 'The Creator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com', //{email}
		subject: 'Reset your password with TimeCatcher',
		html: `<p><a href=${confirmLink}>Click Here</a> to reset password</p>`,
		// react: <EmailVerification /> // design email component
	})
	if (error) return { error: error.message }
	if (data) return { data }
} 