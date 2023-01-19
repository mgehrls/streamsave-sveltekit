import { writable, type Writable } from "svelte/store";

export const searchResults = writable(null)

export const getSearchResults = async (query) =>{
    const res = await fetch(`/api/search?query=${query}`)
    const data = await res.json()
    searchResults.set(data)
}

