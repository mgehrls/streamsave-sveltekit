<script lang="ts">
  import Counter from "./Counter.svelte";
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  export let data: PageData;

  const { trendingData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div class="trending">
    <ShowPreview shows={trendingData.results} />
  </div>
  <Counter />
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
