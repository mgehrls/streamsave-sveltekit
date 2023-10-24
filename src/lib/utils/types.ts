import type { Session } from "@supabase/supabase-js"
import type { List } from "lucide-svelte"

export type ApiResult = {
    adult: boolean,
    backdrop_path: string,
    first_air_date?: string,
    genres: {id:number, name:string}[],
    id:number,
    imdb_id?:string,
    media_type: string,
    name?:string,
    origin_country?: string[],
    original_language: string,
    original_name?:string,
    original_title?:string,
    overview:string,
    popularity: number,
    poster_path:string,
    title?:string,
    release_date?:string,
    video: boolean,
    vote_average:number,
    vote_count:number,
}

export type SearchStoreResults = {
    status: "loading" | "OK" | "error",
    results: ApiResult[],
    query:string
}

export type SbMedia ={
    backdrop_path:string,
    created_at?:string,
    description:string,
    id:number,
    poster_path:string,
    title:string,
    type: string
}

export type ListItemPlusMedia={
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media: SbMedia,
    media_id:number,
    user_id:string,
}

export type ListItem = {
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media_id:number,
    user_id:string,
}

export type UserListItems = {
    count:number,
    data: ListItemPlusMedia[],
    error: null | any,
    status:number,
    statusText:string,
}

export type PageData = {
    listItems: {
        count: number,
        data: ListItemPlusMedia[],
        error: null | any,
        status: number,
        statusText: string,
    },
    session: Session | null,
}