export function timeFormat(time: number) {

	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = Math.floor(time % 60)

	return { hours, minutes, seconds }
}

 export const timeFormatString = ({ time, h, m, includeSeconds, s }: { time: number, h: string, m: string, includeSeconds: boolean, s?: string }) => {
	console.log(timeFormat(time / 1000))
	if (time === 0) {
		if (includeSeconds) return `0${h} 0${m} 0${s}`
		return `0${h} 0${m}`
	}
	const { hours, minutes, seconds } = timeFormat(time / 1000)

	if (hours === 0 && minutes === 0) {
		if (includeSeconds) return `${minutes}${m} ${seconds}${s}`
		return `0${h} 0${m}`
	}

	if(hours === 0){
		if(includeSeconds) return `${minutes}${m} ${seconds}${s}`
		return `${minutes}${m} `
	} 

	if (minutes === 0){
		if(includeSeconds) return `${hours}${h} ${minutes}${m} ${seconds}${s}`
		return `${hours}${h}`
	}

	if (includeSeconds) return `${hours}${h} ${minutes}${m} ${seconds}${s}`
	
	return `${hours}${h} ${minutes}${m}`
}