<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  export let data: PageData;
  export let form;
  console.log(form);

  const { session, trendingShowData, popularMovieData, popularShowData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <div class="trending">
      <ShowPreview title={"Trending Shows"} shows={trendingShowData} />
    </div>
    <div class="trending">
      <ShowPreview title={"Popular Shows"} shows={popularShowData} />
    </div>
    <div class="trending">
      <MoviePreview title={"Popular Movies"} movies={popularMovieData} />
    </div>
  </section>
</main>

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
