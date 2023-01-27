<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";
  export let listItems: ListItemPlusMedia[];
  import Card from "./Card.svelte";
  let innerWidth: number;
</script>

<svelte:window bind:innerWidth />
<div>
  <h2 class="pt-4 text-center font-bold text-xl text-slate-100">Your List</h2>
  {#if listItems.length}
    <div class="min-w-sm max-w-sm px-4 text-white flex flex-col gap-1 mt-2">
      {#each listItems as listItem}
        {#if listItem}
          <Card {listItem} />
        {/if}
      {/each}
    </div>
  {:else}
    <div />
  {/if}
</div>
