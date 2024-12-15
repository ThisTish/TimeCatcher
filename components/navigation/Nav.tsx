import { auth } from '@/server/actions/auth/auth'
import UserBtn from './UserBtn'
import Link from 'next/link'
import FormContainer from '../forms/FormContainer'

import CategoryForm from '../forms/CategoryForm'
import ThemeSelector from './ThemeSelector'

const Nav = async () => {
	const session = await auth()

	return (
		<header className="bg-slate-400 py-4">
			<ul className="flex justify-between">
				<li>
					<Link href="/">
						<h1>TimeCatcher</h1>
					</Link>
				</li>
				{!session ? (
					<li>
						<button>
							<Link href="/auth/login">SignIn</Link>
						</button>
					</li>
				) : (
					<div className='flex gap-3'>
						<ThemeSelector />
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
					</div>
				)
				}
			</ul>
		</header>
	)
}

export default Nav