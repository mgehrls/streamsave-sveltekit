<script>
  export let listItem;
  import { fade } from "svelte/transition";
  import { deleteListItem } from "$lib/stores/listItems";

  function handleDelete(id) {
    deleteListItem(id);
  }
</script>

<div transition:fade class="mediaCard">
  <img
    src={listItem.media.poster_path}
    alt={listItem.media.title + " poster"}
  />
  <div class="info">
    <a href={`/${listItem.media.type}s/${listItem.media.id}`}>
      <h2 class="mediaTitle">{listItem.media.title}</h2>
    </a>
  </div>
</div>
<button on:click={() => handleDelete(listItem.media.id)}>
  <span class="hide-except-from-screenreader">Delete</span>
</button>

<style>
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
  button {
    border: none;
    padding: 8px;
    background: none;
    font-size: 16px;
    display: inline-block;
    position: relative;
    z-index: 1;
  }
  a {
    display: block;
    color: #333;
    text-decoration: none;
  }
</style>
