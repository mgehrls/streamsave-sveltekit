<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems } from "$lib/stores/listItems";
  import Welcome from "./Welcome.svelte";

  export let data: PageData;
  let isAThing: boolean = false;

  $: listItemsArray = $listItems;
  $: listItemsArray.length ? (isAThing = true) : (isAThing = false);

  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-12 pr-8" style="min-height: calc(100vh - 88px);">
  {#if !data.session}
    <Welcome />
  {:else}
    <UserList listItems={listItemsArray} />
    <section class="flex flex-col justify-center col-span-10 mr-10 mt-4">
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Trending Shows"}
          shows={trendingShowData}
        />
      </div>
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Popular Shows"}
          shows={popularShowData}
        />
      </div>
      <div class={trendingClasses}>
        <MoviePreview
          userID={data.session.user.id}
          title={"Popular Movies"}
          movies={popularMovieData}
        />
      </div>
    </section>
  {/if}
</div>
