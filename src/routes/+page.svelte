<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import { onMount } from "svelte";

  export let data: PageData;

  $: listItemsArray = $listItems;
  $: console.log(listItemsArray);

  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  const { popularMovieData, popularShowData, trendingShowData } = data;
  onMount(() => {
    loadListItems();
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-12 pr-8 bg-slate-400">
  {#if listItemsArray.length}
    <UserList listItems={listItemsArray} />
    <section class="flex flex-col justify-center col-span-10 mr-10 mt-4">
      <div class={trendingClasses}>
        <ShowPreview title={"Trending Shows"} shows={trendingShowData} />
      </div>
      <div class={trendingClasses}>
        <ShowPreview title={"Popular Shows"} shows={popularShowData} />
      </div>
      <div class={trendingClasses}>
        <MoviePreview title={"Popular Movies"} movies={popularMovieData} />
      </div>
    </section>
  {:else}
    <section class="flex flex-col justify-center col-span-12 mr-10 mt-4">
      <div class={trendingClasses}>
        <ShowPreview title={"Trending Shows"} shows={trendingShowData} />
      </div>
      <div class={trendingClasses}>
        <ShowPreview title={"Popular Shows"} shows={popularShowData} />
      </div>
      <div class={trendingClasses}>
        <MoviePreview title={"Popular Movies"} movies={popularMovieData} />
      </div>
    </section>
  {/if}
</div>
