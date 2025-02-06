import Guest from "@/components/guestPage/Guest";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {

  await delay(3000)
  return (

    <div>
      {/* <h1 className="text-5xl font-extralight">HomePage</h1> */}
      <Guest />
      
    
    </div>
  )
}
