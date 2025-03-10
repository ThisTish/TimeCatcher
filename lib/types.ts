
import { db } from '@/prisma/db'
import validateActiveGoal from '@/server/actions/goal/validate-active-goal'
import { Color, TimeFrame } from '@prisma/client'
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

// forgot password
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

// add/edit a category
export const categoryFormSchema = z.object({
	name: z.string().min(3, {
		message: "Please use at least 3 characters.",
	}),
	color: z.nativeEnum(Color),
	id: z.string().optional()
})

// add/edit timelog
export const TimeLogSchema = z.object({
	id: z.string().optional(),
	categoryId: z.string(),
	startTime: z.date(),
	endTime: z.date().nullable(),
	timePassed: z.number().optional(),
	userId: z.string().optional()
})

// add/edit goal
export const GoalFormSchema = z.object({
	id: z.string().optional(),
	categoryId: z.string(),
	timeFrame: z.nativeEnum(TimeFrame),
	targetTime: z.number(),
	reoccurring: z.boolean(),
	active: z.boolean().optional(),
	completed: z.boolean().optional(),
	startTime: z.date().optional(),
	endTime: z.date().optional(),
}).refine((data) => !data.active || validateActiveGoal(db, data.categoryId, data.timeFrame), {
	message: "Error occurred, another goal is already active for this category and time frame",
	path:['active']
}
)


// types
export type CategoryTimerCardProps = {
	categoryId: string
	running: boolean
	disabled: boolean
	startTime?: Date
	runningTimeLogId?: string,
}

export type Category = {
	id: string
	name: string
	color: Color
	userId: string
	timeLogs: TimeLog[]
	goals: GoalDisplayProps[]
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
	id: string
	categoryId: string
	timeFrame: TimeFrame
	active: boolean
	reoccurring: boolean
	targetTime: number
	timePassed?: number
	completed: boolean
	startDate?: Date
	endDate?: Date
}



// export enum E_Colors {
// 	BLUE = 'BLUE',
// 	GREEN = 'GREEN',
// 	YELLOW = 'YELLOW',
// 	ORANGE = 'ORANGE',
// 	RED = 'RED',
// 	PINK = 'PINK',
// 	PURPLE = 'PURPLE',
// 	BLACK = 'BLACK',
// 	WHITE = 'WHITE',
// 	GREY = 'GREY',
// }