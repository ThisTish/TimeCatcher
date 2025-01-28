import Loader from "../skeletons/Loader"
import GuestHero from "./GuestHero"

const duration = 10000

const Guest = async() => {
	const delay = (ms) => new Promise((resolve) => setTimeout(ms))

	return (
		<div className="flex flex-col justify-center items-center gap-20 my-20">
			<Loader />
			{/* <h1 className="text-5xl font-black">Guest page</h1> */}
			<GuestHero />
		</div>
	)
}

export default Guest