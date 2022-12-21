import type { PageServerLoad } from "./$types";
import { API_KEY_SECRET } from "$env/static/private";

export const load = (async () =>{
    const res = fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}`)
    const res2 = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US`)
    const trendingShowData = (await res).json()
    const popularMovieData = (await res2).json()

    return{
        trendingShowData,
        popularMovieData
    }
})satisfies PageServerLoad;