import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import toLocalIsoString from "@/lib/to-Local-ISO-String";
import { Label } from "@radix-ui/react-label";
import { RefreshCcwIcon } from "lucide-react";

const SearchByDate = ({table}: any) => {

	return (
		<search>
			<Label htmlFor="date">
				Search by Date
			</Label>
			<div className="flex">
				<Input
					className="w-fit"
					name="date"
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