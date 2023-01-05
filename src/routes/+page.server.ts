import { AuthApiError, type Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"


export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.sb.auth.signUp({
			email: body.email as string,
			password: body.password as string,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: err,
			})
		}

		throw redirect(303, "/")
	},
	signIn: async ({ request, locals, url }) => {

		const provider = url.searchParams.get("provider") as Provider
		if(provider){
			const {data, error:err} = await locals.sb.auth.signInWithOAuth({
				provider: provider
			})
			if(err){
				console.log(err)
				return fail(400, {
					message:"Something went wrong"
				})
			}
			
			throw redirect(303, data.url)
		}

		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		}

		throw redirect(303, "/")
	},
	signOut: async ({locals}) =>{
		const { error:err} = await locals.sb.auth.signOut()

		if(err){
			console.log(err)
		}

		throw redirect(300, "/")
	},
    addMedia: async ({locals, request})=>{

		const formData = Object.fromEntries(await request.formData())
		
		const { error: mediaErr } = await locals.sb.from('media').upsert({
			title: formData.title as string,
			description: formData.description as string,
			type: formData.type as string,
			poster_path: formData.poster_path as string,
			backdrop_path: formData.backdrop_path as string,
			id: formData.id as unknown as number
		})
		
		if(mediaErr instanceof AuthApiError && mediaErr.status === 400){
			return fail(400,{
				error: "auth error probably. here's what supabase says: " + mediaErr
			})
		}else if(mediaErr){
			return fail(400, {
				error: mediaErr
			})
		}
		
		const { error: listItemErr } = await locals.sb.from('listItem').upsert({
			user_id: locals.session?.user.id as string,
			media_id: formData.id as unknown as number
		})

		if(listItemErr instanceof AuthApiError && listItemErr.status === 400){
			return fail(400,{
				error: "auth error probably. here's what supabase says: " + listItemErr
			})
		}else if(listItemErr){
			return fail(400, {
				error: listItemErr
			})
		}

		throw redirect(303, "/")

    }
}