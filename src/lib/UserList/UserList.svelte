<script lang="ts">
  export let listItems: any[];
  import Card from "./Card.svelte";
</script>

{#if listItems.length}
  <div class="bg-orange-700 flex flex-col col-span-2 max-w-sm ml-10 mt-8">
    <h2 class="p-4 font-bold text-lg text-black">Your List</h2>
    {#each listItems as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  </div>
{:else}
  <div />
{/if}
