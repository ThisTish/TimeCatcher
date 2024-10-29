import { auth } from '@/server/auth'
import UserBtn from './UserBtn'
import Link from 'next/link'

const Nav = async () => {
	const session = await auth()

	return (
		<header className="bg-slate-400 py-4">
			<ul className="flex justify-between">
				<li>
					<h1>TimeCatcher</h1>
				</li>
				{!session ? (
					<li>
						<button>
							<Link href='/api/auth/signin'>SignIn</Link>
						</button>
					</li>
				) :
					(
						<li>
							
								<UserBtn user={session?.user} expires={session?.expires} />
						</li>
					)
				}
			</ul>

		</header>
	);
}

export default Nav;