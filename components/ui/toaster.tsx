"use client"

import { useEffect, useState } from 'react'
import { Toaster as Toasty} from 'sonner'

const Toaster = () =>{
	// cosnt {theme} = useTheme()

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])


	if(!isMounted) return null

	// if(typeof theme === 'string'){
	return(
		<Toasty 
			richColors
			position='bottom-center'
			expand={false}
			visibleToasts={1}
			// theme={theme as "light" | "dark" | "system"}
			/>
	)
	// }
}

export default Toaster