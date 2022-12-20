<script>
  import { page } from "$app/stores";
  import ShowPreview from "./ShowPreview.svelte";
  /**
   * @type {string | any[]}
   */
  export let shows;
</script>

{#if shows.length === 0}
  <div class="shows-preview">No articles are here... yet.</div>
{:else}
  <div>
    {#each shows as show (show.slug)}
      <ShowPreview {show} />
    {/each}
  </div>
{/if}
