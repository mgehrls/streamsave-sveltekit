import { API_KEY_SECRET } from "$env/static/private"
import type { ApiResult } from "$lib/utils/types"
import { AuthApiError, type Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load = (async (event) => {
	const fetchTrendingShows = async ()=>{
        const res = await event.fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
        const trendingShowsData = await res.json()
        return trendingShowsData.results as ApiResult[]
    }
    const fetchPopularMovies = async ()=>{
        const res = await event.fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
        const popularMoviesData = await res.json()
        return popularMoviesData.results  as ApiResult[]
    }
    const fetchPopularShows = async ()=>{
        const res = await event.fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
        const popularShowsData = await res.json()
        return popularShowsData.results as ApiResult[]
    }

	return {
		trendingShowData: fetchTrendingShows(),
        popularShowData: fetchPopularShows(),
        popularMovieData: fetchPopularMovies(),
	}

}) satisfies PageServerLoad

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { error: err } = await locals.sb.auth.signUp({
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
	signin: async ({ request, locals, url }) => {

		const provider = url.searchParams.get("provider") as Provider
		if(provider){
			const {data, error:err} = await locals.sb.auth.signInWithOAuth({
				provider: provider
			})
			if(err){
				return fail(400, {
					message:"Something went wrong"
				})
			}
			
			throw redirect(303, data.url)
		}

		const body = Object.fromEntries(await request.formData())

		const { error: err } = await locals.sb.auth.signInWithPassword({
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
	signout: async ({locals}) =>{
		const { error:err} = await locals.sb.auth.signOut()

		if(err){
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		}

		throw redirect(300, "/")
	},
}