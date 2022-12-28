import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad, Actions } from "./$types";
import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const load: LayoutServerLoad = async (event) =>{
    //const res = fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}`)
    //const res2 = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US`)
    //const res3 = fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US`)
    //const trendingShowData = (await res).json()
    //const popularMovieData = (await res2).json()
    //const popularShowData = (await res3).json()
    
    return{
        session: await getServerSession(event),
    }
}
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
				error: "Server error. Please try again later.",
			})
		}

		throw redirect(303, "/")
	},
}