import Loader from "@/components/skeletons/Loader"

const LoadingPage = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-10 h-screen">
			<h1 className="text-5xl text-neutral-700 font-bold text-center">
				<span className=" opacity-35 animate-loading  ">L</span>
				<span className=" opacity-35 animate-loading delay-100">o</span>
				<span className=" opacity-35 animate-loading delay-300">a</span>
				<span className=" opacity-35 animate-loading delay-500">d</span>
				<span className=" opacity-35 animate-loading delay-700">i</span>
				<span className=" opacity-35 animate-loading delay-900">n</span>
				<span className=" opacity-35 animate-loading delay-1100">g</span>
			</h1>
			<Loader />
		</div>
	)
}

export default LoadingPage