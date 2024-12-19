import { auth } from '@/server/actions/auth/auth'
import UserBtn from './UserBtn'
import Link from 'next/link'
import FormContainer from '../forms/FormContainer'

import CategoryForm from '../forms/CategoryForm'
import ThemeSelector from './ThemeSelector'
import { Button } from '../ui/button'

const Nav = async () => {
	const session = await auth()

	return (
		<header className="bg-slate-400 py-4">
			<nav className="flex justify-between">
				<Link href="/">
					<h1>TimeCatcher</h1>
				</Link>
				{!session ? (
					<ul>
						<li>
							<Button asChild >
								<Link href="/auth/login">Sign In</Link>
							</Button>
						</li>
					</ul>
				) : (
					<ul className='flex gap-3'>
						<li>
							<ThemeSelector />
						</li>
						<li>
							<Link href={'/timers'}>Timers</Link>
						</li>
						<li>
							<Link href={'/dashboard'}>Dashboard</Link>
						</li>
						<li>
							<FormContainer
								title='Create a new category'
								description='Choose a name and color for a new category to track'
								openButtonLabel='Add Category'
							>
								<CategoryForm />
							</FormContainer>
						</li>
						<li>
							<UserBtn user={session?.user} expires={session?.expires} />
						</li>
					</ul>
				)
				}
			</nav>
		</header>
	)
}

export default Nav