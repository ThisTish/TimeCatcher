export function timeFormat(time: number) {

	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = Math.floor(time % 60)

	return { hours, minutes, seconds }
}