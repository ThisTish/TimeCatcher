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
		message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
	}),
	confirm: z.string().min(8, {
		message: "Let's make the password more than 8 characters, please"
	})
})
.refine((data) => data.password === data.confirm, {
	message: 'One password is not like the other, try again'
})

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
		message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
	})
}).refine((data) => data.username || data.email, {
	message: 'You gotta login with an email or a username, please.'
})

