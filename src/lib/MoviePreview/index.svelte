<script lang="ts">
  import MoviePreview from "./MoviePreview.svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Carousel: ConstructorOfATypedSvelteComponent;

  export let movies: string | any[];
  export let title: string;
  export let data;

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });
</script>

{#if !movies}
  <div class="movies-preview">No movies are here...</div>
{:else}
  <h2>{title}</h2>
  {#if browser}
    <svelte:component
      this={Carousel}
      particlesToShow={5}
      particlesToScroll={4}
      dots={true}
      arrows={true}
    >
      ...
      {#each movies as movie}
        <MoviePreview {movie} {data} />
      {/each}
    </svelte:component>
  {/if}
{/if}

<style>
  h2 {
    font-weight: bold;
    font-size: larger;
  }
  .trendingRow {
    margin-top: 1rem;
    scrollbar-width: thin;
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    position: relative;
    overflow: auto;
    gap: 1rem;
  }
  .trendingRow::-webkit-scrollbar:horizontal {
    height: 0;
    width: 0;
    display: none;
  }

  .trendingRow::-webkit-scrollbar-thumb:horizontal {
    display: none;
  }
</style>
