<script lang="ts">
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import type { SearchStoreResults } from "$lib/utils/types";
  import SearchResult from "./SearchResult.svelte";
  import type { PageData } from "../../../routes/$types";
  import { onMount } from "svelte";
  import Loading from "$lib/utils/Loading.svelte";
  import Search from "../Icons/Search.svelte";
  export let data: PageData;
  let searchQuery: string = "";
  let timer;
  let loading: boolean = false;
  let gotUser: boolean = false;
  let results: SearchStoreResults;
  let userID: string = "";

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

<div
  class="absolute z-50 flex w-screen max-w-7xl bg-gray-600 top-20 lg:top-24 lg:w-96 lg:right-0"
>
  <Search />
  <input
    type="text"
    placeholder="Search for shows or movies..."
    class="bg-gray-600 text-white w-full lg:pr-20"
    bind:value={searchQuery}
    on:input={debounce}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        // window.location.assign(`/search?query=${searchQuery}`);
      }
    }}
  />
  <button
    on:click={() => {
      searchQuery = "";
      getSearchResults(searchQuery);
    }}
    class="text-slate-300 pr-6 lg:p-4 lg:pr-6">X</button
  >
</div>
{#if results.query !== ""}
  <div
    on:keydown={(e) => {
      if (e.key === "Escape") {
        searchQuery = "";
        getSearchResults(searchQuery);
      }
    }}
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-40 overflow-y-auto flex justify-center px-2 sm:px-0 pt-20"
  >
    <div class="w-full max-w-screen md:max-w-7xl">
      <div class="w-full">
        <div class="pt-20 w-full">
          <div class="flex gap-4 pb-4 mb-4 border-b border-white">
            <h3 class="text-white text-2xl overflow-y-auto">
              Your search results for "{searchQuery}..."
            </h3>
            <button
              on:click={() => {
                searchQuery = "";
                getSearchResults(searchQuery);
              }}
              class="text-slate-300">Clear Search X</button
            >
          </div>
          <div class="flex flex-col gap-4">
            {#each results.results as item}
              <SearchResult {userID} {item} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
{#if loading}
  <Loading />
{/if}
