import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import React from "react"
import Socials from "./Socials"
import BackButton from "./BackButton"


interface AuthCardProps {
	cardTitle: string
	children: React.ReactNode
	showSocials?: boolean
	backButtonLabel: string
	backButtonHref: string
}

const AuthCard = ({cardTitle, children, showSocials, backButtonLabel, backButtonHref}: AuthCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{cardTitle}</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			
			{showSocials 
			? (	<CardContent>
					<Socials />
				</CardContent>
			): null
			}
			<CardFooter>
				<BackButton href={backButtonHref} label={backButtonLabel} />
			</CardFooter>


		</Card>
	)
}

export default AuthCard