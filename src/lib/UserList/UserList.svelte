<script>
  /**
   * @type {any}
   */
  export let listItems;
</script>

<div>
  {#each listItems.data as listItem}
    <h2>{listItem.media_id.title}</h2>
  {/each}
</div>
