import Loader from "../skeletons/Loader"
import GuestHero from "./GuestHero"



const Guest = async() => {

	return (
		<div className="flex flex-col justify-center items-center gap-20 my-20">
			{/* <h1 className="text-5xl font-black">Guest page</h1> */}
			<GuestHero />
		</div>
	)
}

export default Guest