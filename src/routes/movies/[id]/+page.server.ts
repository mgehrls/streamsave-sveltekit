import type { PageServerLoad } from "./$types";
import { API_KEY_SECRET } from "$env/static/private";
import type { ApiResult } from "$lib/utils/types";

export const load = (async ({params}) =>{
    const res = fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY_SECRET}&language=en-US`)
    const item: Promise<ApiResult> = (await res).json()
    return{
        item
    }
})satisfies PageServerLoad;