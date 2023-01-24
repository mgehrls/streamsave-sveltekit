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

<header class="bg-gray-900 text-white p-6 flex justify-between items-center">
  <div class="flex items-center">
    <a href="/" class="text-lg font-medium">StreamSave</a>
  </div>
  {#if gotUser}
    <div class="relative w-1/2">
      <input
        type="text"
        placeholder="Search for shows or movies..."
        class="bg-gray-800 text-white p-2 w-full"
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
          class="rounded-full h-12"
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
