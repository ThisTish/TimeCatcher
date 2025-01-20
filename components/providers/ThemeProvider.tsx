// "use client"

import { Color } from "@prisma/client";

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }


export const backgrounds: Record<Color, string> = {
	RED: 'bg-red',
	BLUE: 'bg-blue',
	GREEN: 'bg-green',
	YELLOW: 'bg-yellow',
	PURPLE: 'bg-purple',
	ORANGE: 'bg-orange',
	PINK: 'bg-pink',
	BLACK: 'bg-black text-white',
	BROWN: 'bg-brown',
	WHITE: 'bg-white text-black',
	GREY: 'bg-grey text-white'
	
}

export const textColor: Record<Color, string> = {
	RED: 'text-red',
	BLUE: 'text-blue',
	GREEN: 'text-green',
	YELLOW: 'text-yellow',
	PURPLE: 'text-purple',
	ORANGE: 'text-orange',
	PINK: 'text-pink',
	BLACK: 'text-black ',
	BROWN: 'text-brown',
	WHITE: 'text-black ',
	GREY: 'text-grey '
	
}
export const shadowColor: Record<Color, string> = {
	RED: 'shadow-red border-red',
	BLUE: 'shadow-blue border-blue',
	GREEN: 'shadow-green border-green',
	YELLOW: 'shadow-yellow border-yellow',
	PURPLE: 'shadow-purple border-purple',
	ORANGE: 'shadow-orange border-orange',
	PINK: 'shadow-pink border-pink',
	BLACK: 'shadow-black border-black ',
	BROWN: 'shadow-brown border-brown',
	WHITE: 'shadow-black border-black ',
	GREY: 'shadow-grey border-grey '
	
}