import { writable } from "svelte/store";
import type { User } from "@supabase/supabase-js";

export const user = writable<User>(null)