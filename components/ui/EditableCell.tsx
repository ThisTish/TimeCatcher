"use client"

import { useEffect, useState } from "react"
import { Input } from "./input"
import { Tooltip, TooltipProvider } from "./tooltip"
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"


const EditableCell = ({ getValue, row, column, table }: any) => {

	const initialValue = getValue()
	const [value, setValue] = useState(initialValue)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (initialValue instanceof Date) {
			setValue(initialValue.toLocaleString())
		}

		// setValue(initialValue)

	}, [initialValue])

	const onBlur = () => {
		const dateValue = new Date(value)
		console.dir(dateValue)
		table.options.meta?.updateData(
			row.index,
			column.id,
			dateValue
		)
		setValue(dateValue)
		setIsEditing(false)
	}

	const onClick = () => {
		if (initialValue instanceof Date) {
			setValue(initialValue.toISOString().slice(0, 16))
		}
		setIsEditing(true)
	}

	return (
		<>
			{column.id === 'startTime' || column.id === 'endTime'
				? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>

						<Input
							type={isEditing ? "datetime-local" : "text"}
							value={value || ''}
							onClick={onClick}
							onChange={(e) => setValue(e.target.value)}
							onBlur={onBlur}
							disabled={value === null}
						/>

							</TooltipTrigger>
							<TooltipContent>
								<p>Click to edit</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					null
				)
			}
		</>
	)
}

export default EditableCell