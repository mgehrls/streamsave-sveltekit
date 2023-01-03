<script lang="ts">
  import Header from "./Header.svelte";
  import Auth from "./Auth.svelte";
  import { supabaseClient } from "$lib/supabase";
  import "./styles.css";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      console.log("Auth state change detected");
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
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
  <main>
    <slot />
  </main>

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
    height: 100px;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 4rem auto;
    box-sizing: border-box;
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
