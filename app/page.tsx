import Guest from "@/components/guestPage/Guest";


export default async function Home() {
  throw new Error('This is a test error')
  return (

    <div>
      {/* <h1 className="text-5xl font-extralight">HomePage</h1> */}
      <Guest />
      
    
    </div>
  )
}
