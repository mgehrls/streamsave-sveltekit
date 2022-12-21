<script lang="ts">
  import Counter from "./Counter.svelte";
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  export let data: PageData;

  const { trendingShowData, popularMovieData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="trending">
    <ShowPreview shows={trendingShowData.results} />
  </div>
  <div class="trending">
    <MoviePreview movies={popularMovieData.results} />
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
  div.trending {
    overflow-y: hidden;
    position: relative;
    overflow: auto;
    width: 100%;
  }
</style>
