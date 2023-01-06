<script>
  import ShowPreview from "./ShowPreview.svelte";
  /**
   * @type {string | any[]}
   */
  export let shows;
  /**
   * @type {string}
   */
  export let title;
</script>

{#if shows.length === 0}
  <div class="movies-preview">No shows are here...</div>
{:else}
  <h2>{title}</h2>
  <div class="trendingRow">
    {#each shows as show}
      <ShowPreview {show} />
    {/each}
  </div>
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
