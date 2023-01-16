import { writable, type Writable } from "svelte/store";
import { supabaseClient } from "$lib/supabase";
import { fail } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { invalidateAll } from "$app/navigation";
import type { fullListItem, sbMedia } from "$lib/types";

export const listItems: Writable<fullListItem[]> = writable([]);

export const loadListItems = async () => {
    const {data, error} = await supabaseClient.from('listItem').select("*, media(*)")
    if(error){
        return console.error(error)
    }
    listItems.set(data)
}

export const deleteListItem = async (id: number) => {
	const {error} = await supabaseClient.from("listItem").delete().eq("media_id", id)
	if(error){
		return console.error(error)
	}else{
		invalidateAll()
		loadListItems()
	}
}

export const addListItem = async (media: sbMedia, userID:string) =>{

    const {error: mediaErr} = await supabaseClient.from('media').upsert({
        title:media.title as string,
        description: media.description as string,
        type: media.type as string,
        poster_path: media.poster_path as string,
        backdrop_path: media.backdrop_path as string,
        id: media.id as unknown as number,
    })
    if(mediaErr instanceof AuthApiError && mediaErr.status === 400){
			return fail(400,{
				error: "auth error probably. here's what supabase says: " + mediaErr
			})
		}else if(mediaErr){
			return fail(400, {
				error: mediaErr
			})
		}

        const { error: listItemErr } = await supabaseClient.from('listItem').upsert({
			user_id: userID,
			media_id: media.id
		})

		if(listItemErr instanceof AuthApiError && listItemErr.status === 400){
			return fail(400,{
				error: "auth error probably. here's what supabase says: " + listItemErr
			})
		}else if(listItemErr){
			return fail(400, {
				error: listItemErr
			})
		}
		invalidateAll()
		loadListItems()
}