<script lang="ts">
  import type { PageData } from "./$types";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems } from "$lib/stores/listItems";
  import Welcome from "./Welcome.svelte";
  import Trending from "./Trending.svelte";
  import MobileView from "./MobileView.svelte";

  export let data: PageData;
  let innerWidth: number;
  let display: "list" | "trending" = "list";

  function toggleView() {
    display === "list" ? (display = "trending") : (display = "list");
  }

  $: listItemsArray = $listItems;
</script>

<svelte:head>
  <title>StreamSave</title>
  <meta
    name="description"
    content="Watchlist and favorite tv/movie application"
  />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
  />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&family=Roboto:wght@300;400;700&display=swap");
  </style>
</svelte:head>
<svelte:window bind:innerWidth />

{#if !data.session}
  <Welcome />
{:else if innerWidth < 700}
  <MobileView {display} {toggleView} {listItemsArray} {data} />
{:else}
  <div class="flex w-screen overflow-hidden 2xl:justify-center">
    {#if listItemsArray.length > 0}
      <UserList listItems={listItemsArray} />
    {/if}
    <Trending {data} />
  </div>
{/if}
