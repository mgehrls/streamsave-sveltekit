import { AuthApiError, type Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
	signin: async ({ request, locals, url }) => {

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
}