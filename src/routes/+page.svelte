<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems, loadListItems } from "$lib/stores/listItems";
  import Welcome from "./Welcome.svelte";
  import { user } from "$lib/stores/userStore";
  import { onMount } from "svelte";

  export let data: PageData;

  $: listItemsArray = $listItems;
  $: userData = $user;
  $: {
    console.log(userData);
    console.log(listItemsArray);
  }
  loadListItems();
  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-12 pr-8" style="min-height: calc(100vh - 112px);">
  {#if !userData && !listItemsArray.length}
    <Welcome />
  {:else}
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
  {/if}
</div>
