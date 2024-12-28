const toLocalIsoString = (date: Date) => {
	const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
	return localDate.toISOString().slice(0, 16)
}

export default toLocalIsoString