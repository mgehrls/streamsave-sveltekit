<script>
  /**
   * @type {any}
   */
  export let listItems;
</script>

<div class="list">
  {#each listItems.data as listItem}
    <div class="mediaCard">
      <img
        src={listItem.media_id.poster_path}
        alt={listItem.media_id.title + " poster"}
      />
      <div class="info">
        <a href={`/${listItem.media_id.type}s/${listItem.media_id.id}`}>
          <h2 class="mediaTitle">{listItem.media_id.title}</h2>
        </a>
      </div>
    </div>
  {/each}
</div>

<style>
  div.list {
    background-color: #ff3e00;
    display: flex;
    flex-direction: column;
  }
  div.mediaCard {
    padding: 0.5rem 1rem;
    display: flex;
    gap: 1rem;
  }
  div.info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
  .mediaTitle {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
  img {
    width: 33%;
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.7), -4px 4px 4px rgba(0, 0, 0, 0.5);
  }
</style>
