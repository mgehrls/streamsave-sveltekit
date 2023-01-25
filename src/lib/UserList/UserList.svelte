<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";
  export let listItems: ListItemPlusMedia[];
  import Card from "./Card.svelte";
  let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#if listItems.length}
  <div
    class={innerWidth > 600
      ? "bg-gray-900 text-white flex flex-col col-span-2 max-w-sm ml-10 mt-8"
      : "max-w-sm px-4"}
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
