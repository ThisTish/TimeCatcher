import { auth } from '@/server/actions/auth/auth'
import UserBtn from './UserBtn'
import Link from 'next/link'
import FormContainer from '../forms/FormContainer'

import CategoryForm from '../forms/CategoryForm'
import ThemeSelector from './ThemeSelector'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MenuSquare } from 'lucide-react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

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
					<>
						<ul className='hidden md:flex gap-3'>
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
						<div className='md:hidden'>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<MenuSquare />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<ThemeSelector />
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href={'/timers'}>Timers</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href={'/dashboard'}>Dashboard</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<FormContainer
										title='Create a new category'
										description='Choose a name and color for a new category to track'
										openButtonLabel='Add Category'
									>
										<CategoryForm />
									</FormContainer>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<UserBtn user={session?.user} expires={session?.expires} />

								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						</div>
					</>
				)
				}
			</nav>
		</header>
	)
}

export default Nav