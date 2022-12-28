import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";
import { API_KEY_SECRET } from "$env/static/private";

export const load: LayoutServerLoad = async (event) =>{
    const res = fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}`)
    const res2 = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US`)
    const res3 = fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US`)
    const trendingShowData = (await res).json()
    const popularMovieData = (await res2).json()
    const popularShowData = (await res3).json()
    
    return{
        session: await getServerSession(event),
		trendingShowData,
		popularShowData,
		popularMovieData,
    }
}