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

<div class="app">
  {#if !$page.data.session}
    <Header data={null} />
    <div class="spacer" />
    <Auth />
  {:else}
    <Header data={$page.data.session} />
    <div class="spacer" />
  {/if}

  <slot />

  <footer>
    <p>
      data and images curtosy of <a href="https://www.themoviedb.org/"
        >themoviedb.org</a
      >
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .spacer {
    height: 80px;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
