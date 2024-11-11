// finding the domain, or it is localhost. can change after deployment
export const getBaseUrl = () =>{
	if(typeof window !== 'undefined') return ''

	if(process.env.VERCEL_URL) return `${process.env.DOMAIN_URL}`
	'localhost:3000'
}
