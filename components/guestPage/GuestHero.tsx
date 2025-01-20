import Clock from "./Clock"


const GuestHero = () => {


	return (
		<>
			<Clock />


			{/* summary */}
			<div className="md:space-y-5">
				<h1 className="text-3xl md:text-6xl p-7 text-center md:text-start text-nowrap">Feel like you're losing time!?</h1>
				<h2 className="text-xl w-2/3 ml-16 text-end md:text-3xl">If you're not catching your time, you're wasting it.</h2>
			</div>

			{/* buttons */}
			<div className="flex gap-3 text-nowrap md:text-xl md:absolute right-28 md:bottom-5 ">

				{/* <div className=" border-2 rounded-md border-blue-300 text-blue-600 p-1 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all ease-in">
						<RegisterForm />
					</div>
					<div className="bg-blue-600 text-white rounded-md p-1 border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 hover: hover:scale-110 transition-all ease-in">
						<LoginForm />
					</div> */}
			</div>
		</>
	)
}

export default GuestHero