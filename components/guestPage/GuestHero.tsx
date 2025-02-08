import Link from "next/link"
import LoginForm from "../auth/LoginForm"
import RegisterForm from "../auth/RegisterForm"
import { Button } from "../ui/button"
import Clock from "./Clock"


const GuestHero = () => {


	return (
		<section className="w-full flex flex-col justify-center items-center gap-16 pb-16 md:gap-4">
			<Clock />


			{/* summary */}
			<div className="flex flex-col gap-4 py-4 px-4 bg-neutral-400 border rounded-md border-neutral-700 shadow-inner shadow-neutral-700 size-64 md:tracking-tight md:w-2/3 md:self-end md:mr-8 lg:gap-8 ">

				<h1 className=" text-3xl md:text-5xl text-end font-semibold text-balance">
					Feel like you're losing time?
				</h1>
				<h2 className=" text-xl text-start text-balance md:text-end md:text-3xl">
					Catch your time to make it work for you!
				</h2>
				<div className="space-x-4 mt-4 self-center md:hidden">
					<Button size={'sm'} variant={'secondary'} asChild >
						<Link href="/auth/register">Register</Link>
					</Button>
					<Button size={'sm'} asChild >
						<Link href="/auth/login">Sign In</Link>
					</Button>
				</div>
				<div className="hidden md:block space-x-4 self-end mt-8">
					<Button  variant={'secondary'} asChild >
						<Link href="/auth/register">Register</Link>
					</Button>
					<Button  asChild >
						<Link href="/auth/login">Sign In</Link>
					</Button>
				</div>

			</div>

			{/* buttons */}
			{/* <div className="flex gap-3 text-nowrap md:text-xl md:absolute right-28 md:bottom-5 ">

				<div className=" border-2 rounded-md border-blue-300 text-blue-600 p-1 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all ease-in">
					<RegisterForm />
				</div>
				<div className="bg-blue-600 text-white rounded-md p-1 border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 hover: hover:scale-110 transition-all ease-in">
					<LoginForm />
				</div>
			</div> */}
		</section>
	)
}

export default GuestHero