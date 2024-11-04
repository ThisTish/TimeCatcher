'use client'

import {z} from 'zod'

// to register a user
export const registerFormSchema = z.object({
	username: z.string().min(3, {
		message: 'More than 3 characters for a username, please',
	})
	.max(20, {
		message: 'Less than 20 characters for username, please'
	}).toLowerCase(),

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

// todo trying to make it so you can login with username or email, while still keeping their requirements. 

// to login a user
export const loginFormSchema = z.object({
	username: z.string().min(3, {
		message: 'More than 3 characters for a username, please',
	})
	.max(20, {
		message: 'Less than 20 characters for username, please'
	}).toLowerCase(),

	email: z.string().email({
		message: 'Not an actual email address. Please try again'
	}).toLowerCase(),

	password: z.string().min(8, {
		message: "Let's make the password more than 8 characters, please"
	}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
		message: 'Use at lease one of each, Uppercase, LowerCase, and Number. Special characters are not welcome.'
	}),
	code: z.optional(z.string())

}).refine((data) => data.username || data.email, {
	message: 'You gotta login with an email or a username, please.',
	path: ['username', 'email']
})

