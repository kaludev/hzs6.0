import { getServerSession } from "next-auth"


export const POST= async (Request) => {
    const res = new Response();
    
    const session = getServerSession()
}