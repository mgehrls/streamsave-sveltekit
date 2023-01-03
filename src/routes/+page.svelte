<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  export let data: PageData;
  export let form: ActionData;

  console.log(form);
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <section>
    <div class="trending">
      <ShowPreview title={"Trending Shows"} shows={data.trendingShowData} />
    </div>
    <div class="trending">
      <ShowPreview title={"Popular Shows"} shows={data.popularShowData} />
    </div>
    <div class="trending">
      <MoviePreview title={"Popular Movies"} movies={data.popularMovieData} />
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
