import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({locals}) =>{
    const { error:err } = await locals.sb.auth.signOut()

    if(err){
        throw error(500, "The database didn't receive your request to log out. Please try again.")
    }
    
    throw redirect(303, "/")
}