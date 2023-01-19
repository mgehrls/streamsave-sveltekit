import { API_KEY_SECRET } from "$env/static/private"

export const GET = async ({fetch, url}) => {
    const query = url.searchParams.get('query')

    console.log(query)
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_SECRET}&language=en-US&query=${query}&page=1&include_adult=false`)
    const data = await res.json()

    return new Response(JSON.stringify({data}), {status:200})
}