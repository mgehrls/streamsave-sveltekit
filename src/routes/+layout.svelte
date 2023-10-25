<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Loading from "$lib/utils/Loading.svelte";
  import LayoutWrapper from "$lib/utils/LayoutWrapper.svelte";
  import SearchBar from "$lib/components/SearchBar/SearchBar.svelte";
  import Analytics from "$lib/utils/analytics.svelte";
  import "../app.css";
  import { supabaseClient } from "$lib/supabase";
  import { user } from "$lib/stores/userStore";
  import { invalidateAll } from "$app/navigation";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";
  import { register } from "swiper/element/bundle";
  import type { PageData } from "./$types";

  let loading: boolean = true;

  export let data: PageData;
  register();
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
    loading = false;
  });
</script>

{#if loading}
  <div class="flex flex-col justify-between min-h-screen bg-zinc-900">
    <Header {data} />
    <div class="self-center">
      <Loading />
    </div>
    <Footer />
  </div>
{:else}
  <Analytics />
  <body class="flex flex-col min-h-screen bg-zinc-900">
    <Header {data} />
    <div class="flex-1">
      <LayoutWrapper>
        <slot />
      </LayoutWrapper>
    </div>
    <Footer />
  </body>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&family=Roboto:wght@300;400;700&display=swap");
</style>
