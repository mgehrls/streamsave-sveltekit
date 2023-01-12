<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import { listItems } from "$lib/stores/listItems";
  import UserList from "$lib/UserList/UserList.svelte";

  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-blue-900">
  {#if $listItems}
    <div class="w-96">
      <UserList listItems={$listItems} />
    </div>
  {/if}
  <section class="flex flex-col justify-center">
    <div class={trendingClasses}>
      <ShowPreview
        title={"Trending Shows"}
        shows={data.trendingShowData}
        {data}
      />
    </div>
    <div class={trendingClasses}>
      <ShowPreview
        title={"Popular Shows"}
        shows={data.popularShowData}
        {data}
      />
    </div>
    <div class={trendingClasses}>
      <MoviePreview
        title={"Popular Movies"}
        movies={data.popularMovieData}
        {data}
      />
    </div>
  </section>
</div>
