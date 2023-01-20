<script lang="ts">
  import type { listItemPlusMedia } from "$lib/types";
  export let listItems: listItemPlusMedia[];
  import Card from "./Card.svelte";
</script>

{#if listItems.length}
  <div class="bg-orange-600 flex flex-col col-span-2 max-w-sm ml-10 mt-8">
    <h2 class="p-4 font-bold text-xl text-slate-900">Your List</h2>
    {#each listItems as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  </div>
{:else}
  <div />
{/if}
