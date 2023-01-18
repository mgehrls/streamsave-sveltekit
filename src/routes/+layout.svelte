<script lang="ts">
  import Header from "./Header.svelte";
  import { supabaseClient } from "$lib/supabase";
  import { user } from "$lib/stores/userStore";
  import "./styles.css";
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  onMount(async () => {
    if (data.session?.user) {
      user.set(data.session.user);
      loadListItems();
    }
    if (data.listItems.data.length) {
      listItems.set(data.listItems.data);
    }

    supabaseClient.auth.onAuthStateChange((_, session) => {
      user.set(session?.user);
      if (session?.user) {
        loadListItems();
      }
      invalidateAll();
    });
  });
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <slot />

  <footer
    class="flex flex-col justify-center items-center p-4 bg-slate-800 text-white"
  >
    <p>
      data and images curtosy of <a
        class="font-bold"
        href="https://www.themoviedb.org/">themoviedb.org</a
      >
    </p>
  </footer>
</div>
