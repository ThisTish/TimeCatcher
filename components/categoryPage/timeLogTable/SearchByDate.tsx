import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@radix-ui/react-label"
import { RefreshCcwIcon } from "lucide-react"

const SearchByDate = ({table}: any) => {

	return (
		<search>
			<Label className="text-md" htmlFor="start-date">
				Search by Date
			</Label>
			<div className="flex items-center">

				<Input
					className="w-fit "
					name="start-date"
					type="date"
					value={(table.getColumn('startTime')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('startTime')?.setFilterValue(event.target.value)}
				/>
			
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
				<Button
					className="p-0 ml-2"
					variant={'secondary'}
					onClick={() => table.getColumn('startTime')?.setFilterValue('')}
					>
								<RefreshCcwIcon />
				</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Reset Search</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					</div>
		</search>
	)
}

export default SearchByDate