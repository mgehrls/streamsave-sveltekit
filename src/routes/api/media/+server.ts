import { AuthApiError } from "@supabase/supabase-js"
import { fail } from "@sveltejs/kit"
import type { Actions } from "../../$types";
import type { RequestHandler } from "./$types"



export const actions: Actions = {
    GET:async () =>{
     
        return new Response(JSON.stringify({message:"hello"}), {status:201})
    },
    PUT: async ({request, locals}) =>{
        const body = await request.json()
        const {movie} = body
        const {id, title, overview: description, backdrop_path, poster_path} = movie 
    
        const { error:err} = await locals.sb.from("media").upsert({id, title, description, backdrop_path, poster_path})
        
        if(err){
            if(err instanceof AuthApiError && err.status === 400){
                return fail(400,{
                    error: "Could be data, could be unauthorized, depends."
                })
            }
            return fail(500, {
                error:"this you?"
            })
        }
    
        return new Response(JSON.stringify({message:"Success."}), {status:201})
    }
};