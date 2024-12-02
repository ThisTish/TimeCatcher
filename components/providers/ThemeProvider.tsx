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
	WHITE: 'bg-white',
	GREY: 'bg-grey',
}