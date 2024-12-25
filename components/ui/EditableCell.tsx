"use client"

import { useEffect, useState } from "react"
import { Input } from "./input"

const EditableCell = ({getValue, row, column, table}: any) => {

	const initialValue = getValue()
	// console.log('initialValue',initialValue)
	// console.dir(initialValue instanceof Date)
	// console.dir(column.id)
	const [value, setValue] = useState(initialValue)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() =>{
			setValue(initialValue)
		
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

	const onClick = () =>{
		if(initialValue instanceof Date){
			// console.log('instance of date' , initialValue)
			setValue(initialValue.toISOString().slice(0, 16))
		}
		setIsEditing(true)
	}

	return (
		<>
			{column.id === 'startTime' 
				? (
					<Input 
					type={isEditing ? "datetime-local" : "text"}
					value={value || ''}
					onClick={onClick}
					onChange={(e) => setValue(e.target.value)}
					onBlur={onBlur}
					/>
				) : (
					null
				)
			}
		</>
	)
}

export default EditableCell