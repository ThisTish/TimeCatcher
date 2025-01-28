const Loader = () => {
	return (
		<div className="size-48 bg-primary-foreground relative border-8 border-teal-500 rounded-full flex justify-center items-center">
			<span className="block bg-teal-500 w-3 h-16 rounded-full absolute top-[88px] left-[82px] animate-loader duration-700 origin-top ease-linear"></span>
			<span className="block bg-teal-500 w-3 h-10 rounded-full absolute top-[88px] left-[82px] animate-loader duration-1000 origin-top ease-linear"></span>
			<span className=" flex justify-center items-center bg-teal-500 size-6 rounded-full">
			</span>
		</div>
	)
}

export default Loader


