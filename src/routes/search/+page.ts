import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({fetch, url}) =>{
    const query = url.searchParams.get('query')
    const res = await fetch(`/api/search?query=${query}`)
    const data = await res.json()
    const results = data.data.results.filter((item)=> item.media_type !== 'person')
    return {results, query}
}