import type { SearchStoreResults } from "$lib/utils/types";
import { writable } from "svelte/store";



const initialState: SearchStoreResults = {
    status:"loading",
    results:[],
    query:""
}

export const searchResults = writable(initialState)

export const getSearchResults = async (query:string) =>{
    const res = await fetch(`/api/search?query=${query}`)
    const data = await res.json()
    searchResults.set({
        status:"OK",
        results: data.data.results,
        query:query})


}

