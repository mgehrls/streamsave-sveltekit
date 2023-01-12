<script>
  import ShowPreview from "./ShowPreview.svelte";
  import { fade } from "svelte/transition";
  /**
   * @type {string | any[]}
   */
  export let shows;
  /**
   * @type {string}
   */
  export let title;
  export let data;
</script>

{#if !shows}
  <div transition:fade class="movies-preview">No shows are here...</div>
{:else}
  <h2 class="font-bold text-lg text-white m-0">{title}</h2>
  <div class="trendingRow">
    {#each shows as show}
      <ShowPreview {show} {data} />
    {/each}
  </div>
{/if}

<style>
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
