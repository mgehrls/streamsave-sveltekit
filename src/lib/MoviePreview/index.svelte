<script>
  import { page } from "$app/stores";
  import MoviePreview from "./MoviePreview.svelte";
  /**
   * @type {string | any[]}
   */
  export let movies;
</script>

{#if movies.length === 0}
  <div class="movies-preview">No movies are here...</div>
{:else}
  <h2>Popular Movies</h2>
  <div class="trendingRow">
    {#each movies as movie}
      <MoviePreview {movie} />
    {/each}
  </div>
{/if}

<style>
  h2 {
    margin-top: 3rem;
    font-weight: bold;
    font-size: larger;
  }
  .trendingRow {
    margin-top: 1rem;
    scrollbar-width: thin;
    display: flex;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    overflow: auto;
    width: 100%;
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
