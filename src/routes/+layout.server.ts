import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";
import { API_KEY_SECRET } from "$env/static/private";
import { supabaseClient } from "$lib/supabase";

export const load: LayoutServerLoad = async (event) =>{

    const fetchTrendingShows = async ()=>{
        const res = await event.fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}`)
        const trendingShowsData = await res.json()
        return trendingShowsData.results
    }
    const fetchPopularMovies = async ()=>{
        const res = await event.fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US`)
        const popularMoviesData = await res.json()
        return popularMoviesData.results
    }
    const fetchPopularShows = async ()=>{
        const res = await event.fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US`)
        const popularShowsData = await res.json()
        return popularShowsData.results
    }
    const session = await getServerSession(event)

    const fetchUserListItems = async ()=>{
        const listItems = await supabaseClient.from("listItem").select("user_id, media_id (*)",  ).eq("user_id", session?.user.id)
        return listItems
    }

    return{
        trendingShowData: fetchTrendingShows(),
        popularShowData: fetchPopularShows(),
        popularMovieData: fetchPopularMovies(),
        session,
        listItems: fetchUserListItems()
    }
}