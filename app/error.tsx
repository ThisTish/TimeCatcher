'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"


const ErrorPage = ({error, reset}: {error: Error & {digest?: string}, reset: () => void}) => {
	useEffect(() =>{
		console.error(error)	
	},[])

	return ( 
		<>
			<h1 className="text-7xl"> ERROR.... </h1>
			<h2 className="text-4xl">{error.message}</h2>	 
			<Button onClick={() => reset()}>Try Again</Button>
		</>
			)
}
 
export default ErrorPage