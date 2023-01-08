import { supabaseClient } from "$lib/supabase";
import { writable } from "svelte/store";

export function initialValue(){
    return{
        items: new Map(),
    }
}

export const createListItemStore = (args) =>{
    let initial = initialValue();
    let store = 
}