import type { PageServerLoad } from "../$types";
import { API_KEY_SECRET } from "$env/static/private";

export const load: PageServerLoad = async ({fetch, url}) =>{
    const query = url.searchParams.get('query')
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_SECRET}&language=en-US&query=${query}&page=1&include_adult=false`)
    const data = await res.json()

    return {data, query}
}