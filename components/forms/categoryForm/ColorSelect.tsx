'use client'

import { useState } from 'react'
import { E_Colors } from '@/lib/types'



type T_Colors = keyof typeof E_Colors

const ColorSelect = () => {
	const [selectedColor, setSelectedColor] = useState<T_Colors | undefined>(undefined)

	const colors: T_Colors[] = Object.keys(E_Colors) as T_Colors[]

	return (
		<div className="flex flex-col gap-6">
			<select
				id="color"
				className="select select-bordered"
				value={selectedColor}
				onChange={e => setSelectedColor(e.target.value as T_Colors)}
			>
				<option value="">Pick a Color</option>
				{colors.map(color => (
					<option key={color} value={color}>
						{E_Colors[color]}
					</option>
				))}
			</select>
			{selectedColor && (
				<div className="alert alert-info">
					You have selected <strong>{E_Colors[selectedColor]}</strong>.
				</div>
			)}
		</div>
	)
}

export default ColorSelect