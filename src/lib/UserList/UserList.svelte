<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";
  export let listItems: ListItemPlusMedia[];
  import Card from "./Card.svelte";
</script>

{#if listItems.length}
  <div
    class="bg-gray-900 text-white flex flex-col col-span-2 max-w-sm ml-10 mt-8"
  >
    <h2 class="p-4 font-bold text-xl text-slate-100">Your List</h2>
    {#each listItems as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  </div>
{:else}
  <div />
{/if}
