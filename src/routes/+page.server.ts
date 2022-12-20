import type { PageServerLoad } from "./$types";
import { API_KEY_SECRET } from "$env/static/private";

export const load = (async () =>{
    const res = fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}`)
    const trendingData = (await res).json()

    return{
        trendingData
    }
})satisfies PageServerLoad;