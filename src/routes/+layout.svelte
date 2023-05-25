<script lang="ts">
  import Header from "./Header.svelte";
  import { supabaseClient } from "$lib/supabase";
  import { user } from "$lib/stores/userStore";
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";
  import Loading from "$lib/utils/Loading.svelte";
  import LayoutWrapper from "$lib/utils/LayoutWrapper.svelte";
  import SearchBar from "$lib/components/SearchBar/SearchBar.svelte";
  import Analytics from "$lib/utils/analytics.svelte";

  export let data: PageData;
  onMount(() => {
    invalidateAll();
    if (data.session?.user) {
      user.set(data.session.user);
      loadListItems();
    }
    if (data.listItems.data && data.listItems.data.length) {
      listItems.set(data.listItems.data);
    }

    supabaseClient.auth.onAuthStateChange((_, session) => {
      user.set(session?.user);
      if (session?.user) {
        user.set(session.user);
        loadListItems();
      }
      invalidateAll();
    });
  });
</script>

<Analytics />
<div class="flex flex-col min-h-screen bg-zinc-900">
  <Header {data} />
  <LayoutWrapper>
    <slot />
  </LayoutWrapper>
  <footer
    class="text-center border-2 border-slate-800 border-solid fixed bottom-0 right-0 px-4 py-2 bg-slate-200 bg-opacity-80"
  >
    <p class="text-sm">
      data and images courtesy of <a
        class="font-bold"
        href="https://www.themoviedb.org/">themoviedb.org</a
      >
    </p>
  </footer>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&family=Roboto:wght@300;400;700&display=swap");
  p {
    font-family: "Roboto", sans-serif;
  }
</style>
