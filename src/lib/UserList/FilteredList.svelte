<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";
  import Card from "./Card.svelte";

  export let listItems: ListItemPlusMedia[];
  export let filter: "All" | "Shows" | "Movies";
  export let sort: "AZ" | "ZA" | "most recent" | "oldest";

  const movieItems = listItems.filter((item) => item.media.type === "movie");
  const showItems = listItems.filter((item) => item.media.type === "show");

  function sortAlphaUp(a, b) {
    if (a.media.title < b.media.title) {
      return -1;
    }
    if (a.media.title > b.media.title) {
      return 1;
    }
    return 0;
  }
  function sortRecentUp(a, b) {
    if (a.lastSeen > b.lastSeen) {
      return -1;
    }
    if (a.lastSeen < b.lastSeen) {
      return 1;
    }
    return 0;
  }
</script>

<div class="min-w-sm max-w-sm px-4 text-white flex flex-col gap-1 mt-2">
  {#if filter === "All"}
    {#if sort === "AZ"}
      {#each listItems.sort(sortAlphaUp) as listItem}
        <Card {listItem} />
      {/each}
    {:else if sort === "ZA"}
      {#each listItems.sort(sortAlphaUp).reverse() as listItem}
        <Card {listItem} />
      {/each}
    {:else if sort === "most recent"}
      {#each listItems.sort(sortRecentUp) as listItem}
        <Card {listItem} />
      {/each}
    {:else}
      {#each listItems.sort(sortRecentUp).reverse() as listItem}
        <Card {listItem} />
      {/each}
    {/if}
  {:else if filter === "Movies"}
    {#if sort === "AZ"}
      {#each movieItems.sort(sortAlphaUp) as listItem}
        {#if listItem}
          <Card {listItem} />
        {/if}
      {/each}
    {:else if sort === "ZA"}
      {#each movieItems.sort(sortAlphaUp).reverse() as listItem}
        {#if listItem}
          <Card {listItem} />
        {/if}
      {/each}
    {:else if sort === "most recent"}
      {#each movieItems.sort(sortRecentUp) as listItem}
        {#if listItem}
          <Card {listItem} />
        {/if}
      {/each}
    {:else}
      {#each movieItems.sort(sortRecentUp).reverse() as listItem}
        {#if listItem}
          <Card {listItem} />
        {/if}
      {/each}
    {/if}
  {:else if sort === "AZ"}
    {#each showItems.sort(sortAlphaUp) as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  {:else if sort === "ZA"}
    {#each showItems.sort(sortAlphaUp).reverse() as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  {:else if sort === "most recent"}
    {#each showItems.sort(sortRecentUp) as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  {:else}
    {#each showItems.sort(sortRecentUp).reverse() as listItem}
      {#if listItem}
        <Card {listItem} />
      {/if}
    {/each}
  {/if}
</div>
