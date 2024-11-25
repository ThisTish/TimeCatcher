
import * as z from 'zod'
// to register a user
export const registerFormSchema = z.object({
	name: z.string().min(3, {
		message: 'More than 3 characters for a name, please',
	})
	.max(20, {
		message: 'Less than 20 characters for name, please'
	}),

	email: z.string().email({
		message: 'Not an actual email address. Please try again'
	}).toLowerCase(),

	password: z.string().min(8, {
		message: "Let's make the password more than 8 characters, please"
	}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		message: 'Use at lease one of each, Uppercase, LowerCase, and Number. Special characters are not welcome.'
	}),
	confirm: z.string().min(8, {
		message: "Let's make the password more than 8 characters, please"
	}),
	code: z.optional(z.string())
})
.refine((data) => data.password === data.confirm, {
	message: 'One password is not like the other, try again'
})


// to login a user
export const loginFormSchema = z.object({

	email: z.string().email({
		message: 'Not an actual email address. Please try again'
	}).toLowerCase(),

	password: z.string().min(8, {
		message: "A password should be more than 8 characters, yeah"
	})
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		message: 'Use at lease one of each, Uppercase, LowerCase, and Number. Special characters are not welcome.'
	}),

	code: z.optional(z.string())
})

export const forgotPasswordFormSchema = z.object({

	email: z.string().email({
		message: 'Not an actual email address. Please try again'
	}).toLowerCase()
})

export const newPasswordFormSchema = z.object({

	password: z.string().min(8, {
		message: "A password should be more than 8 characters, yeah"
	}),
	token: z.string().nullable().optional()
})

export enum E_Colors {
	BLUE = 'Blue',
	GREEN = 'Green',
	YELLOW = 'Yellow',
	ORANGE = 'Orange',
	RED = 'Red',
	PINK = 'Pink',
	PURPLE = 'Purple',
	BLACK = 'Black',
	WHITE = 'White',
	GRAY = 'Gray',
	BROWN = 'Brown'
}

export const categoryFormSchema = z.object({
	category: z.string().min(3, {
		message: "Please use at least 3 characters.",
	}),
	color: z.enum([E_Colors.BLUE, E_Colors.GREEN, E_Colors.YELLOW, E_Colors.ORANGE, E_Colors.RED, E_Colors.PINK, E_Colors.PURPLE, E_Colors.BLACK, E_Colors.WHITE, E_Colors.GRAY, E_Colors.BROWN])
})
