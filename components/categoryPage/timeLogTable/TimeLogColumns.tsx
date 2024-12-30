import { ColumnDef, createColumnHelper, FilterFn, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"
import { timeFormat } from "@/lib/time-format"
import EditableCell from "@/components/ui/EditableCell"
import isStartDate from "@/lib/is-start-date"

import DeleteTimeLogButton from "./DeleteTimeLogButton"
import EditTimeLogButton from "./EditTimeLogButton"

// todo create sorting function to retrieve the date from the date object and sort that way?
export const TimeLogColumns: ColumnDef<TimeLog>[] = 
	[
		// {
		// 	accessorKey: 'id',
		// 	header: 'ID'
		// },

		{
			accessorKey: 'startTime',
			header: 'Start Time',
			cell: EditableCell,
			filterFn: isStartDate,
			sortingFn: 'datetime',

		},
		{
			accessorKey: 'endTime',
			header: 'End Time',
			cell: EditableCell,
			sortingFn: 'datetime'

		},
		{
			accessorKey: 'timePassed',
			header: 'Time Caught',
			footer: ({ table }) => {
				const totalTimePassed = table
					.getFilteredRowModel()
					.rows.reduce((sum, row) => sum + row.getValue<number>('timePassed'), 0)
				const { hours, minutes, seconds } = timeFormat(totalTimePassed / 1000)

				return `Total Time Caught: ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
			},
			cell: ({ row }) => {
				const timePassed = row.getValue('timePassed') as number
				const { hours, minutes, seconds } = timeFormat(timePassed / 1000)
				const formattedTimePassed = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`

				return (
					<span>
						{formattedTimePassed}
					</span>
				)
			},
			sortingFn: 'basic'
		},
		// {
		// 	accessorKey: 'running',
		// 	header: 'Running'
		// },
		{
			accessorKey: 'edit',
			header: 'Save',
			cell: EditTimeLogButton,
			enableSorting: false
		},
		{
			accessorKey: 'delete',
			header: 'Delete',
			cell: DeleteTimeLogButton,
			enableSorting: false
		}
	]
