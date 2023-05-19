<script lang="ts">
  import Card from "./Card.svelte";
  import ListView from "./ListView.svelte";
  import { listItems } from "$lib/stores/listItems";

  export let displayType: "grid" | "list";
  export let filter: "All" | "Shows" | "Movies";
  export let sort: "AZ" | "ZA" | "most recent" | "oldest";

  $: movieItems = $listItems.filter((item) => item.media.type === "movie");
  $: showItems = $listItems.filter((item) => item.media.type === "show");

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

<div>
  {#if $listItems.length === 0}
    <p>No media here</p>
  {:else if displayType === "grid"}
    <!--Grid view Start-->
    <div
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 justify-center justify-items-center items-center gap-2 rounded-lg bg-slate-800 p-4"
    >
      {#if filter === "All"}
        {#if sort === "AZ"}
          {#each $listItems.sort(sortAlphaUp) as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "ZA"}
          {#each $listItems.sort(sortAlphaUp).reverse() as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "most recent"}
          {#each $listItems.sort(sortRecentUp) as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "oldest"}
          {#each $listItems.sort(sortRecentUp).reverse() as listItem}
            <Card {listItem} />
          {/each}
        {:else}
          {#each $listItems as listItem}
            <Card {listItem} />
          {/each}
        {/if}
      {:else if filter === "Movies"}
        {#if sort === "AZ"}
          {#each movieItems.sort(sortAlphaUp) as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "ZA"}
          {#each movieItems.sort(sortAlphaUp).reverse() as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "most recent"}
          {#each movieItems.sort(sortRecentUp) as listItem}
            <Card {listItem} />
          {/each}
        {:else if sort === "oldest"}
          {#each movieItems.sort(sortRecentUp).reverse() as listItem}
            <Card {listItem} />
          {/each}
        {:else}
          {#each movieItems as listItem}
            <Card {listItem} />
          {/each}
        {/if}
      {:else if sort === "AZ"}
        {#each showItems.sort(sortAlphaUp) as listItem}
          <Card {listItem} />
        {/each}
      {:else if sort === "ZA"}
        {#each showItems.sort(sortAlphaUp).reverse() as listItem}
          <Card {listItem} />
        {/each}
      {:else if sort === "most recent"}
        {#each showItems.sort(sortRecentUp) as listItem}
          <Card {listItem} />
        {/each}
      {:else if sort === "oldest"}
        {#each showItems.sort(sortRecentUp).reverse() as listItem}
          <Card {listItem} />
        {/each}
      {:else}
        {#each showItems as listItem}
          <Card {listItem} />
        {/each}
      {/if}
    </div>
  {:else}
    <!--List view Start-->
    <div
      class="[&>*:nth-child(first)]:rounded-t-lg [&>*:nth-child(last)]:rounded-b-lg [&>*:nth-child(odd)]:bg-slate-800 [&>*:nth-child(even)]:bg-sky-600"
    >
      {#if filter === "All"}
        {#if sort === "AZ"}
          {#each $listItems.sort(sortAlphaUp) as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "ZA"}
          {#each $listItems.sort(sortAlphaUp).reverse() as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "most recent"}
          {#each $listItems.sort(sortRecentUp) as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "oldest"}
          {#each $listItems.sort(sortRecentUp).reverse() as listItem}
            <ListView {listItem} />
          {/each}
        {:else}
          {#each $listItems as listItem}
            <ListView {listItem} />
          {/each}
        {/if}
      {:else if filter === "Movies"}
        {#if sort === "AZ"}
          {#each movieItems.sort(sortAlphaUp) as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "ZA"}
          {#each movieItems.sort(sortAlphaUp).reverse() as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "most recent"}
          {#each movieItems.sort(sortRecentUp) as listItem}
            <ListView {listItem} />
          {/each}
        {:else if sort === "oldest"}
          {#each movieItems.sort(sortRecentUp).reverse() as listItem}
            <ListView {listItem} />
          {/each}
        {:else}
          {#each movieItems as listItem}
            <ListView {listItem} />
          {/each}
        {/if}
      {:else if sort === "AZ"}
        {#each showItems.sort(sortAlphaUp) as listItem}
          <ListView {listItem} />
        {/each}
      {:else if sort === "ZA"}
        {#each showItems.sort(sortAlphaUp).reverse() as listItem}
          <ListView {listItem} />
        {/each}
      {:else if sort === "most recent"}
        {#each showItems.sort(sortRecentUp) as listItem}
          <ListView {listItem} />
        {/each}
      {:else if sort === "oldest"}
        {#each showItems.sort(sortRecentUp).reverse() as listItem}
          <ListView {listItem} />
        {/each}
      {:else}
        {#each showItems as listItem}
          <ListView {listItem} />
        {/each}
      {/if}
    </div>
  {/if}
</div>
