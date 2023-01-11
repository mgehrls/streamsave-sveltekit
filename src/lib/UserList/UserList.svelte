<script>
  /**
   * @type {any[]}
   */
  export let listItems;
  import Card from "./Card.svelte";
</script>

<div class="list">
  {#each listItems as listItem}
    {#if listItem}
      <Card {listItem} />
    {/if}
  {/each}
</div>

<style>
  div.list {
    background-color: #ff3e00;
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
</style>
