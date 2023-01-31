<script lang="ts">
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import HeaderResult from "$lib/searchresults/HeaderResult.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { SearchStoreResults } from "$lib/types";
  import { fade } from "svelte/transition";
  import Loading from "$lib/Loading.svelte";
  export let data: PageData;

  let searchQuery: string = "";
  let timer;
  let results: SearchStoreResults;
  let userID: string = "";
  let gotUser: boolean = false;
  let innerWidth: number;
  let loading: boolean = false;
  let gridColumns: number = 1;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      loading = true;
      getSearchResults(searchQuery);
    }, 500);
  };
  $: if (innerWidth) {
    gridColumns =
      innerWidth < 900 ? 1 : innerWidth < 1200 ? 2 : innerWidth < 1500 ? 3 : 4;
  }
  $: results = $searchResults;
  $: if ($searchResults.status === "OK") {
    loading = false;
  }
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

<svelte:window bind:innerWidth />

<header
  style="background: linear-gradient(180deg, rgb(100 116 139) 0%, rgba(160, 174, 192, 0) 100%);"
  class="bg-slate-500 text-white p-6 flex justify-between items-center"
>
  <div class={innerWidth > 600 ? "flex items-center" : "hidden"}>
    <a href="/" class="text-lg font-medium">StreamSave</a>
  </div>
  {#if gotUser}
    <div class={innerWidth > 600 ? "relative w-1/2" : "relative w-full mr-4"}>
      <input
        type="text"
        placeholder="Search for shows or movies..."
        class="bg-gray-900 text-white p-2 w-full rounded-md text-sm z-50"
        bind:value={searchQuery}
        on:input={debounce}
        on:keydown={(e) => {
          if (e.key === "Enter") {
            window.location.assign(`/search?query=${searchQuery}`);
          }
        }}
      />
      {#if results.query !== ""}
        <div
          on:keydown={(e) => {
            if (e.key === "Escape") {
              searchQuery = "";
              getSearchResults(searchQuery);
            }
          }}
          on:click={() => {
            searchQuery = "";
            getSearchResults(searchQuery);
          }}
          class="fixed top-0 left-0 w-screen h-screen flex justify-center items-start pt-16 p-8 bg-black bg-opacity-75 z-40 overflow-y-scroll"
        >
          <button
            on:click={() => {
              searchQuery = "";
              getSearchResults(searchQuery);
            }}
            class="fixed top-10 right-10 text-xl">X</button
          >
          <div class={`absolute grid grid-cols-${gridColumns} top-6.5`}>
            {#each results.results as item}
              <HeaderResult {userID} {item} />
            {/each}
          </div>
        </div>
      {/if}
      {#if loading}
        <Loading />
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
    <div class="flex justify-center items-center gap-2 relative">
      {#if data.session.user}
        <img
          class="rounded-full w-12"
          on:keydown={(e) => {
            if (e.key === "Enter")
              document.getElementById("menu").classList.toggle("hidden");
          }}
          on:click={() => {
            document.getElementById("menu").classList.toggle("hidden");
          }}
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
    </div>
  {/if}
  <nav
    transition:fade
    id="menu"
    class="absolute top-16 z-50 right-4 mt-2 py-2 bg-gray-800 text-white rounded-lg hidden"
  >
    <a href="/" class="block px-4 py-2 text-white">Home</a>
    <a href="/" class="block px-4 py-2 text-white">About</a>
    <a href="/" class="block px-4 py-2 text-white">Contact</a>
    <div
      class="flex justify-center items-center border-t border-slate-100 border-solid py-2"
    >
      <form method="post" action="/logout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  </nav>
</header>
