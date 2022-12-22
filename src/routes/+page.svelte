<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  export let data: PageData;

  const { trendingShowData, popularMovieData, popularShowData, test } = data;
  console.log(test);
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="trending">
    <ShowPreview title={"Trending Shows"} shows={trendingShowData.results} />
  </div>
  <div class="trending">
    <ShowPreview title={"Popular Shows"} shows={popularShowData.results} />
  </div>
  <div class="trending">
    <MoviePreview title={"Popular Movies"} movies={popularMovieData.results} />
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
