import Loader from "../skeletons/Loader"
import GuestHero from "./GuestHero"



const Guest = async() => {

	return (
		<div className="flex flex-col justify-center items-center gap-20">
			<GuestHero />
		</div>
	)
}

export default Guest