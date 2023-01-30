<script lang="ts">
  import Header from "./Header.svelte";
  import { supabaseClient } from "$lib/supabase";
  import { user } from "$lib/stores/userStore";
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  onMount(() => {
    invalidateAll();
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
        user.set(session.user);
        loadListItems();
      }
      invalidateAll();
    });
  });
</script>

<div class="flex flex-col min-h-screen bg-slate-900">
  <Header {data} />
  <div style="min-height: calc(100vh - 88px);">
    <slot />
  </div>

  <footer
    class="text-center border-2 border-slate-800 border-solid fixed bottom-0 right-0 px-4 py-2 bg-slate-200 bg-opacity-80"
  >
    <p class="text-sm">
      data and images curtosy of <a
        class="font-bold"
        href="https://www.themoviedb.org/">themoviedb.org</a
      >
    </p>
  </footer>
</div>
