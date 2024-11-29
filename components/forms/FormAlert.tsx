import { cn } from "@/lib/utils"
// Message for after registering or logging in
const FormAlert = ({message, type}: {message: string, type: 'error' | 'success'}) => {
	return (
		<div className={cn('mx-auto p-1 w-fit',
			type === 'error' ? 'bg-rose-300' : '',
			type === 'success' ? 'bg-emerald-300': ''
		)}>
			<p>{message}</p>
		</div>
	)
}

export default FormAlert