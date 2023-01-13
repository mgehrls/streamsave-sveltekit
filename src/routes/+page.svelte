<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import { listItems } from "$lib/stores/listItems";
  import UserList from "$lib/UserList/UserList.svelte";
  import { fade } from "svelte/transition";

  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-12 pr-8 bg-slate-500">
  {#if $listItems}
    <UserList listItems={$listItems} />
  {/if}
  <section class="flex flex-col justify-center col-span-10 mr-10">
    <div transition:fade class={trendingClasses}>
      <ShowPreview
        title={"Trending Shows"}
        shows={data.trendingShowData}
        {data}
      />
    </div>
    <div transition:fade class={trendingClasses}>
      <ShowPreview
        title={"Popular Shows"}
        shows={data.popularShowData}
        {data}
      />
    </div>
    <div transition:fade class={trendingClasses}>
      <MoviePreview
        title={"Popular Movies"}
        movies={data.popularMovieData}
        {data}
      />
    </div>
  </section>
</div>
