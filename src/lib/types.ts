export type apiResult = apiShowResult | apiMovieResult

export type apiShowResult = {
    adult: boolean,
    backdrop_path: string,
    first_air_date: string,
    genre_ids: number[],
    id:number,
    media_type: string,
    name:string,
    onList?:boolean,
    origin_country: string[],
    original_language: string,
    original_name:string,
    overview:string,
    popularity: number,
    poster_path:string,
    vote_average:number,
    vote_count:number,
}
export type apiMovieResult = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    onList?:boolean,
    original_language: string,
    original_title:string,
    overview:string,
    popularity: number,
    poster_path:string,
    release_date:string,
    title:string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export type sbMedia ={
    backdrop_path:string,
    created_at?:string,
    description:string,
    id:number,
    poster_path:string,
    title:string,
    type: string
}

export type listItemPlusMedia={
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media: sbMedia,
    media_id:number,
    user_id:string,
}

export type listItem = {
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media_id:number,
    user_id:string,
}

export type userListItems = {
    count:number,
    data: listItemPlusMedia[],
    error: null | any,
    status:number,
    statusText:string,
}