<script>
  import UserList from "$lib/UserList/UserList.svelte";
  import Trending from "./Trending.svelte";

  export let display;
  export let toggleView;
  export let listItemsArray;
  export let data;
</script>

<div class="flex flex-col relative max-w-screen overflow-auto p-4 gap-4">
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
        class="bg-slate-100 text-slate-700 underline text-sm py-2 px-8 rounded-r-full"
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
</div>
