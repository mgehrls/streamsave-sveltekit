<script>
  /**
   * @type {any[]}
   */
  export let listItems;
  import Card from "./Card.svelte";
</script>

<div class="bg-orange-700 flex flex-col col-span-2 max-w-sm ml-10">
  <h2 class="p-4 font-bold text-lg text-black">Your List</h2>
  {#each listItems as listItem}
    {#if listItem}
      <Card {listItem} />
    {/if}
  {/each}
</div>
