import Link from "next/link"
import { Button } from "../ui/button"

const BackButton = ({ href, label }: { href: string, label: string }) => {
	return (
		<Button variant={'secondary'}>
			<Link href={href}>
				{label}
			</Link>
		</Button>
	)
}

export default BackButton