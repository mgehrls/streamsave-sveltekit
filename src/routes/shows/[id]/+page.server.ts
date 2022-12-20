import type { PageServerLoad } from "./$types";
import { API_KEY_SECRET } from "../../../lib/server/secrets";

export const load = (async ({params}) =>{
    const res = fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${API_KEY_SECRET}&language=en-US`)
    const item = (await res).json()
    return{
        item
    }
})satisfies PageServerLoad;