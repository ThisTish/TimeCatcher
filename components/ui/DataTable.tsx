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
import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Label } from "./label"


interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	title: "Timelogs" | "Goals"
	description: string
	placeholder: string
}

const DataTable = <TData, TValue>({ columns, data, title, description, placeholder }: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])


	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		groupedColumnMode: false,
		// getFilteredRowModel: getFilteredRowModel(),
		// onColumnFiltersChange: setColumnFilters,
		// state: {
		// 	sorting,
		// 	columnFilters
		// }
	})

	// table.setGrouping(['timePassed'])


	return (
		<Card>
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
				<div>
					{/* search by date */}
					<div>
						<Label htmlFor="date">
							Search by Date
						</Label>
						<Input
							name="date"
							type="date"
							placeholder={placeholder}
							value={(table.getColumn('startTime')?.getFilterValue() as string) ?? ''}
							onChange={(event) => table.getColumn('startTime')?.setFilterValue(event.target.value)}
						/>
					</div>

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
							{/* todo get row to show total time from timePassed for present timeLogs */}
						</TableBody>
						{title === 'Timelogs' ? (
							<TableFooter>
								{table.getFooterGroups().map((footerGroup) => (
									<TableRow key={footerGroup.id}>
										{footerGroup.headers.map((header) =>(
											<TableCell key={header.id}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableFooter>
						):(
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
				</div>
			</CardContent>
		</Card>
	)
}

export default DataTable