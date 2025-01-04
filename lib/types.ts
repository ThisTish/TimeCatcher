
import { TimeFrame } from '@prisma/client'
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
	BLUE = 'BLUE',
	GREEN = 'GREEN',
	YELLOW = 'YELLOW',
	ORANGE = 'ORANGE',
	RED = 'RED',
	PINK = 'PINK',
	PURPLE = 'PURPLE',
	BLACK = 'BLACK',
	WHITE = 'WHITE',
	GREY = 'GREY',
}

export const categoryFormSchema = z.object({
	name: z.string().min(3, {
		message: "Please use at least 3 characters.",
	}),
	color: z.nativeEnum(E_Colors),
	id: z.string().optional()
})

export type CategoryTimerCardProps = {
	categoryId: string
	running: boolean
	disabled: boolean
	startTime?: Date
	runningTimeLogId?: string,
}


export type TimeLog = {
	id: string
    categoryId?: string
    startTime: Date
    endTime: Date | null
    timePassed: number
    running: boolean
} | undefined | null

export type GoalDisplayProps = {
    	id:string
		timeFrame: TimeFrame
		active: boolean
		reoccurring: boolean
		targetTime: number
		completed: boolean
	}[]


export const TimeLogSchema = z.object({
	id: z.string().optional(),
	categoryId: z.string(),
	startTime: z.date(),
	endTime: z.date().nullable(),
	timePassed: z.number().optional(),
	userId: z.string().optional()
})

export const GoalFormSchema = z.object({
	id: z.string().optional(),
	categoryId: z.string(),
	timeFrame: z.nativeEnum(TimeFrame),
	targetTime: z.number(),
	reoccurring: z.boolean(),
	active: z.boolean().optional(),
	
	startTime: z.date().optional(),
	endTime: z.date().optional()
})