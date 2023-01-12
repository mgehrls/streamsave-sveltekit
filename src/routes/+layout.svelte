<script lang="ts">
  import Header from "./Header.svelte";
  import Auth from "./Auth.svelte";
  import { supabaseClient } from "$lib/supabase";
  import { user } from "$lib/stores/userStore";
  import "./styles.css";
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";

  onMount(async () => {
    if ($page.data.session?.user) {
      user.set($page.data.session.user);
      loadListItems();
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

<div class="flex flex-col min-h-screen bg-pink-300">
  {#if !$page.data.session}
    <Header data={null} />
    <Auth />
  {:else}
    <Header data={$page.data.session} />
  {/if}

  <slot />

  <footer class="flex flex-col justify-center items-center p-4">
    <p>
      data and images curtosy of <a
        class="font-bold"
        href="https://www.themoviedb.org/">themoviedb.org</a
      >
    </p>
  </footer>
</div>
