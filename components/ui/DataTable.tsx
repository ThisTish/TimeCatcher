"use client"

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, RefreshCcwIcon } from "lucide-react"
import { Label } from "./label"
import AddTimeLogForm from "../categoryPage/AddTimeLogForm"
import isStartDate from "@/lib/is-start-date"
import SearchByDate from "../categoryPage/timeLogTable/SearchByDate"



interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	title: "Timelogs" | "Goals"
	description: string
	placeholder: string
	categoryId?: string
}




const DataTable = <TData, TValue>({ columns, data, title, description, placeholder, categoryId }: DataTableProps<TData, TValue>) => {
	const [currentData, setCurrentData] = useState<TData[]>(data)
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data: currentData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		groupedColumnMode: false,
		meta: {
			updateData: (rowIndex: number, columnId: string, value: any) =>
				setCurrentData((prev) =>
					prev.map((row, index) =>
						index === rowIndex
							? {
								...row,
								[columnId]: value,
							}
							: row
					)
				),
		},
		getFilteredRowModel: getFilteredRowModel(),
		filterFns: {
			isStartDate
		},
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters
		},
		onSortingChange: setSorting
	})
	// console.log(currentData)
	// console.dir(columnFilters)

	return (
		<Card className="w-fit bg-gray-200/55">
			{/* Table Label & description */}
			<CardHeader>
				<CardTitle>
					{title}
				</CardTitle>
				<CardDescription>
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<>
					{/*SearchBar  */}
					{/* todo fix date value and add date range */}
					<SearchByDate table={table} />

					<Table>

						{/* column labels */}
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</TableHead>
										)
									})}

								</TableRow>
							))}
						</TableHeader>

						{/* data rows and columns */}
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
									>
										No Results
									</TableCell>
								</TableRow>
							)}
						</TableBody>

						{/* Total Time for timelogs */}
						{title === 'Timelogs' && categoryId ? (
							<TableFooter>
								{table.getFooterGroups().map((footerGroup) => (
									<TableRow key={footerGroup.id}>
										{footerGroup.headers.map((header) => (
											<TableCell key={header.id}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}

								{/* Add a timelog */}
								<TableRow>
									<TableCell>
										<AddTimeLogForm categoryId={categoryId} />
									</TableCell>
								</TableRow>
							</TableFooter>
						) : (
							null
						)}
					</Table>

					{/* pagination */}
					<div>
						<Button
							variant={'outline'}
							disabled={!table.getCanPreviousPage()}
							onClick={() => table.previousPage()}
						>
							<ChevronLeft />
							<span>Previous</span>
						</Button>
						<Button
							variant={'outline'}
							disabled={!table.getCanNextPage()}
							onClick={() => table.nextPage()}
						>
							<ChevronRight />
							<span>Next</span>
						</Button>
					</div>
				</>
			</CardContent>
		</Card>
	)
}

export default DataTable