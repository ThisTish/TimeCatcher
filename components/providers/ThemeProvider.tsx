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
	RED: 'shadow-red',
	BLUE: 'shadow-blue',
	GREEN: 'shadow-green',
	YELLOW: 'shadow-yellow',
	PURPLE: 'shadow-purple',
	ORANGE: 'shadow-orange',
	PINK: 'shadow-pink',
	BLACK: 'shadow-black ',
	BROWN: 'shadow-brown',
	WHITE: 'shadow-black ',
	GREY: 'shadow-grey '
	
}