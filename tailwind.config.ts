import { transform } from "next/dist/build/swc/generated-native";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				blue: 'var(--blue)',
				green: 'var(--green)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
				red: 'var(--red)',
				pink: 'var(--pink)',
				purple: 'var(--purple)',
				black: 'var(--black)',
				white: 'var(--white)',
				grey: 'var(--grey)',
    			card: {
    				DEFAULT: 'var(--card)',
    				foreground: 'var(--card-foreground)'
    			},
    			popover: {
    				DEFAULT: 'var(--popover)',
    				foreground: 'var(--popover-foreground)'
    			},
    			primary: {
    				DEFAULT: 'var(--primary)',
    				foreground: 'var(--primary-foreground)'
    			},
    			secondary: {
    				DEFAULT: 'var(--secondary)',
    				foreground: 'var(--secondary-foreground)'
    			},
    			muted: {
    				DEFAULT: 'var(--muted)',
    				foreground: 'var(--muted-foreground)'
    			},
    			accent: {
    				DEFAULT: 'var(--accent)',
    				foreground: 'var(--accent-foreground)'
    			},
    			destructive: {
    				DEFAULT: 'var(--destructive)',
    				foreground: 'var(--destructive-foreground)'
    			},
    			border: 'var(--border)',
    			input: 'var(--input)',
    			ring: 'var(--ring)',
    			chart: {
    				'1': 'var(--chart-1)',
    				'2': 'var(--chart-2)',
    				'3': 'var(--chart-3)',
    				'4': 'var(--chart-4)',
    				'5': 'var(--chart-5)'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
				"flip-down":{
					from:{
						transform: 'rotateX(0deg)',
						opacity: '1'
					},
					to:{
						transform: 'rotateX(-90deg)',
						opacity: '.9'
					}
				},
				"flip-up" :{
					from: {
						transform: 'rotateX(-90deg)',
						opacity: '.9'
					},
					to: {
						transform: 'rotateX(0deg)',
						opacity: '1'
					}
				}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
				"flip-down": 'flip-down .5s ease-out',
				"flip-up": 'flip-up .5s ease-in'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;
