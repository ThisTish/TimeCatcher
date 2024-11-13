'use client'
import { useCallback, useEffect, useState } from "react"
import AuthCard from "./AuthCard"
import { useSearchParams, useRouter } from "next/navigation"
import { newVerification } from "@/server/actions/tokens"
import FormAlert from "./FormAlert"
import { set } from "zod"

const EmailVerificationForm = () => {
	const [verificationError, setVerificationError] = useState('')
	const [verificationSuccess, setVerificationSuccess] = useState('')

	const token = useSearchParams().get('token')
	const router = useRouter()

	const handleVerification = useCallback(async () => {
		if (verificationSuccess || verificationError) return

		if (!token) {
			setVerificationError('No token found')
			return
		}
		const { error, success } = await newVerification(token)
		if (error) {
			setVerificationError(error)
			return
		}
		if (success) {
			setVerificationSuccess(success)
			setTimeout(() => {
				router.push('/auth/login')

			},3000)
			
		}

	}, [])

	useEffect(() => {
		handleVerification()
	})


	return (
		<AuthCard cardTitle="It's about Time! Email Verified!" backButtonHref="/auth/login" backButtonLabel="Back to login" >
			<p className="mx-auto">{!verificationSuccess || !verificationError ? 'Verifying email...' : null} </p>
			{verificationSuccess ? <FormAlert message={`${verificationSuccess}`} type="success" /> : <FormAlert message={`${verificationError}`} type="error" /> }
		</AuthCard>
	)
}

export default EmailVerificationForm