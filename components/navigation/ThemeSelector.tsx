import * as React from "react"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const ThemeSelector = () => {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Themes" />
			</SelectTrigger>
			<SelectContent className="hover:bg-gradient-to-b from-purple via-yellow  to-blue">
				<SelectGroup>
					{/* on hover, setOptimistic? for theme colors */}
					<SelectItem value="base">Base</SelectItem>
					<SelectItem value="retro">Retro</SelectItem>
					<SelectItem value="neon">Neon</SelectItem>
					<SelectItem value="pride">Pride</SelectItem>
					<SelectItem value="jewel">Jewel</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}


export default ThemeSelector