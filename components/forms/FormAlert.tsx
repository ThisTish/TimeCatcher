import { cn } from "@/lib/utils"
// Message for after registering or logging in
const FormAlert = ({message, type}: {message: string, type: 'error' | 'success'}) => {
	return (
		<div className={cn('mx-auto p-1 w-fit',
			type === 'error' ? 'bg-red-400/75' : '',
			type === 'success' ? 'bg-green-400/75': ''
		)}>
			<p>{message}</p>
		</div>
	)
}

export default FormAlert