<script lang="ts">
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import HeaderResult from "$lib/searchresults/HeaderResult.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { SearchStoreResults } from "$lib/types";
  export let data: PageData;

  let searchQuery: string = "";
  let timer;
  let results: SearchStoreResults;
  let userID: string = "";
  let gotUser: boolean = false;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getSearchResults(searchQuery);
    }, 1000);
  };

  $: results = $searchResults;
  $: if (data.session) {
    gotUser = true;
  }
  onMount(() => {
    if (data.session !== null) {
      gotUser = true;
      userID = data.session.user.id;
    }
  });
</script>

<header
  class="w-full flex justify-between items-center gap-4 sticky text-white p-4 z-30 h-100 bg-slate-700"
>
  <div class="logo">
    <a class="m-0 p-0" href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
  {#if gotUser}
    <div class="relative w-1/2">
      <input
        class="text-black w-full"
        type="text"
        bind:value={searchQuery}
        on:input={debounce}
      />
      {#if results.query !== ""}
        <div class="absolute flex flex-col top-6.5 z-50">
          {#each results.results as item}
            <HeaderResult {userID} {item} />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
  {#if !gotUser}
    <div class="flex justify-center items-center gap-8">
      <a data-sveltekit-reload class="m-0 p-0" target="_self" href="/login"
        >Login</a
      >
      <a data-sveltekit-reload class="m-0 p-0" href="/register">Register</a>
    </div>
  {:else}
    <div class="flex justify-center items-center gap-2">
      <p>Welcome!</p>
      {#if data.session.user}
        <img
          class="rounded-full h-12"
          src={data.session.user.user_metadata.avatar_url}
          alt={data.session.user.user_metadata.name
            .split(" ")[0]
            .slice(0, 1)
            .toUpperCase() +
            data.session.user.user_metadata.name
              .split(" ")[1]
              .slice(0, 1)
              .toUpperCase()}
        />
      {/if}
      <form method="post" action="/logout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  {/if}
</header>
