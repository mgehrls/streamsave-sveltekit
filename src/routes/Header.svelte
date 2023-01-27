<script lang="ts">
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import HeaderResult from "$lib/searchresults/HeaderResult.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { SearchStoreResults } from "$lib/types";
  import { fade } from "svelte/transition";
  export let data: PageData;

  let searchQuery: string = "";
  let timer;
  let results: SearchStoreResults;
  let userID: string = "";
  let gotUser: boolean = false;
  let innerWidth: number;
  let loading: boolean = false;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      loading = true;
      getSearchResults(searchQuery);
    }, 500);
  };

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
        class="bg-gray-900 text-white p-2 w-full rounded-md text-sm"
        bind:value={searchQuery}
        on:input={debounce}
        on:keydown={(e) => {
          if (e.key === "Enter") {
            window.location.assign(`/search?query=${searchQuery}`);
          }
        }}
      />
      {#if results.query !== ""}
        <div class="absolute flex flex-col top-6.5 z-50">
          {#each results.results as item}
            <HeaderResult {userID} {item} />
          {/each}
        </div>
      {/if}
      {#if loading}
        <div
          class="bg-slate-800 p-4 flex justify-center items-center h-32 w-full absolute top-12"
        >
          <div class="p-1 self-center" role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-slate-800 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
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
