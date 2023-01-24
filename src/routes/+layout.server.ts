import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";
import type {  UserListItems } from "$lib/types";

export const load: LayoutServerLoad = async (event) =>{
  
    const session = await getServerSession(event)
        
    const loadListItems = async () => {
        const listItems = await event.locals.sb.from('listItem').select("*, media(*)")
        if(listItems.error){
            console.log(listItems.error)
        }
        if(listItems.data.length){
            listItems.count = listItems.data.length
        }
        return listItems as UserListItems
    }

    return{
        session,
        listItems: loadListItems()
    }
}
