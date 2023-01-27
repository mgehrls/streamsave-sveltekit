<script lang="ts">
  import type { PageData } from "./$types";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems } from "$lib/stores/listItems";
  import Welcome from "./Welcome.svelte";
  import Trending from "./Trending.svelte";

  export let data: PageData;
  let innerWidth: number;
  let display: "list" | "trending" = "list";

  function toggleView() {
    display === "list" ? (display = "trending") : (display = "list");
  }

  $: listItemsArray = $listItems;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<svelte:window bind:innerWidth />

{#if !data.session}
  <Welcome />
{:else if innerWidth < 700}
  <div class="flex justify-center items-center mt-4">
    {#if display === "list"}
      <button
        disabled
        class="bg-slate-100 text-slate-700 text-sm py-2 px-8 underline rounded-l-full"
        on:click={toggleView}>Your List({listItemsArray.length})</button
      >
      <button
        class="bg-slate-700 text-slate-300 text-sm py-2 px-8 hover:bg-slate-200 hover:text-slate-600 rounded-r-full"
        on:click={toggleView}>Trending</button
      >
    {:else}
      <button
        class="bg-slate-700 text-slate-300 text-sm py-2 px-8 hover:bg-slate-200 hover:text-slate-600 rounded-l-full"
        on:click={toggleView}>Your List({listItemsArray.length})</button
      >
      <button
        disabled
        class="bg-slate-100 text-slate-700 underline text-sm py-2 px-8  rounded-r-full"
        on:click={toggleView}>Trending</button
      >
    {/if}
  </div>

  {#if display === "list"}
    <div class="grid place-content-center">
      <UserList listItems={listItemsArray} />
    </div>
  {:else}
    <Trending {data} />
  {/if}
{:else}
  <div
    class={listItemsArray.length > 0
      ? "flex items-start"
      : "grid place-content-center"}
  >
    {#if listItemsArray.length > 0}
      <UserList listItems={listItemsArray} />
    {/if}
    <Trending {data} />
  </div>
{/if}
