<script lang="ts">
  import type { PageData } from "./$types";
  import UnAuthedHome from "$lib/components/UnAuthed/UnAuthedHome.svelte";
  import MediaRow from "$lib/components/MediaRow/MediaRow.svelte";
  import { onMount } from "svelte";
  import Loading from "$lib/utils/Loading.svelte";
  export let data: PageData;
  let loading: boolean = true;
  onMount(() => {
    loading = false;
    console.log(data);
  });
</script>

<svelte:head>
  <title>StreamSave</title>
  <meta
    name="description"
    content="Watchlist and favorite tv/movie application"
  />
  <meta property="og:image" content="/images/mobile-list.png" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
  />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&family=Roboto:wght@300;400;700&display=swap");
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Outfit", sans-serif;
    }
    p {
      font-family: "Roboto", sans-serif;
    }
  </style>
</svelte:head>
{#if loading}
  <div class="flex justify-center items-center h-full w-full p-96">
    <Loading />
  </div>
{:else if !data.session}
  <UnAuthedHome />
{:else}
  <div
    class="flex w-full mt-16 lg:mt-8 overflow-hidden 2xl:justify-center px-2"
  >
    <div class="overflow-hidden flex flex-col gap-6 mt-4">
      <MediaRow title={"Your List"} link="/list" linkTitle="See more..." />
      <MediaRow
        title={"Trending Shows"}
        media={data.trendingShowData}
        mediaType={"tv"}
      />
      <MediaRow
        title={"Popular Movies"}
        media={data.popularMovieData}
        mediaType={"movie"}
      />
      <MediaRow
        title={"Popular Shows"}
        media={data.popularShowData}
        mediaType={"tv"}
      />
    </div>
  </div>
{/if}
