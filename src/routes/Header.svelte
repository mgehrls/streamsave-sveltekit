<script lang="ts">
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import HeaderResult from "$lib/components/searchresults/HeaderResult.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { SearchStoreResults } from "$lib/utils/types";
  import { fade } from "svelte/transition";
  import Loading from "$lib/utils/Loading.svelte";
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
  class="bg-slate-800 text-white py-4 md:px-8 flex gap-2 px-2 justify-between items-center sticky top-0 z-50"
>
  <div class={"flex items-center"}>
    <a href="/" class="text-xl flex gap-1 items-end font-bold tracking-wide">
      <img
        src="/images/streamsave_logo.png"
        alt="StreamSave Logo"
        class="w-6"
      />
      <div class="hidden sm:block">
        <h1>treamSave</h1>
      </div>
    </a>
  </div>
  {#if gotUser}
    <div class="relative sm:ml-8 w-full lg:w-1/2">
      <input
        type="text"
        placeholder="Search for shows or movies..."
        class="bg-gray-900 text-white p-2 w-full rounded-md text-md z-50"
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
      <a
        data-sveltekit-reload
        class="px-6 py-2 bg-pink-600"
        target="_self"
        href="/signin">Sign in</a
      >
      <a data-sveltekit-reload class="px-6 py-2 bg-sky-600" href="/signin"
        >Register</a
      >
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
      <form method="post" action="/signout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  </nav>
</header>
