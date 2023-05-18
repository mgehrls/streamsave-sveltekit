<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/utils/types";
  import { Film, Tv, History, SortAsc, SortDesc } from "lucide-svelte";
  import FilteredList from "./FilteredList.svelte";
  import AlphaDown from "$lib/components/Icons/alphaDown.svelte";
  import AlphaUp from "$lib/components/Icons/alphaUp.svelte";
  import GridView from "$lib/components/Icons/gridView.svelte";
  import ListView from "$lib/components/Icons/listView.svelte";
  import SortRecent from "$lib/components/Icons/sortRecent.svelte";
  import SortOldest from "$lib/components/Icons/sortOldest.svelte";

  export let listItems: ListItemPlusMedia[];

  let filter: "All" | "Shows" | "Movies" = "All";
  let sort: "AZ" | "ZA" | "most recent" | "oldest" = "AZ";
  let displayType: "grid" | "list" = "grid";

  function addHiddenFilter() {
    document.getElementById("filterDiv").classList.add("hidden");
  }
  function removeHiddenFilter() {
    document.getElementById("filterDiv").classList.remove("hidden");
  }
  function addHiddenSort() {
    document.getElementById("sortDiv").classList.add("hidden");
  }
  function removeHiddenSort() {
    document.getElementById("sortDiv").classList.remove("hidden");
  }
  function toggleDisplay() {
    if (displayType === "grid") {
      displayType = "list";
    } else {
      displayType = "grid";
    }
  }
</script>

<div class="flex flex-col">
  <div class="flex justify-between items-center pt-4 px-4">
    <h2 class="text-center font-bold text-2xl text-slate-100">Favorites</h2>
    <!-- Filter -->
    <div class="text-sm flex justify-around items-center gap-2">
      <div
        on:mouseenter={removeHiddenFilter}
        on:mouseleave={addHiddenFilter}
        class="flex gap-2 justify-center items-center text-slate-100 relative"
      >
        {#if filter === "All"}
          <button
            class="bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenFilter}>All</button
          >
        {:else if filter === "Movies"}
          <button
            class="bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenFilter}><Film size={15} /></button
          >
        {:else}
          <button
            class="bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenFilter}><Tv size={15} /></button
          >
        {/if}
        <!-- IGNORE ERROR ABOUT HIDDEN AND FLEX APPLYING THE SAME PROPERTY-->
        <div
          class="hidden absolute flex flex-col justify-center items-center -top-1 bg-slate-300 text-slate-800 rounded-md"
          id="filterDiv"
        >
          <button
            class={filter === "All"
              ? "bg-slate-800 text-slate-100 py-2 px-4"
              : "py-2 px-4 hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document
                  .getElementById("filterDiv")
                  .classList.contains("hidden")
              ) {
                document.getElementById("filterDiv").classList.remove("hidden");
              } else {
                document.getElementById("filterDiv").classList.add("hidden");
              }
              filter = "All";
            }}>All</button
          >
          <button
            class={filter === "Movies"
              ? "bg-slate-800 text-slate-100 py-2 px-4"
              : "py-2 px-4 hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document
                  .getElementById("filterDiv")
                  .classList.contains("hidden")
              ) {
                document.getElementById("filterDiv").classList.remove("hidden");
              } else {
                document.getElementById("filterDiv").classList.add("hidden");
              }
              filter = "Movies";
            }}><Film size={15} /></button
          >
          <button
            class={filter === "Shows"
              ? "bg-slate-800 text-slate-100 py-2 px-4"
              : "py-2 px-4 hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document
                  .getElementById("filterDiv")
                  .classList.contains("hidden")
              ) {
                document.getElementById("filterDiv").classList.remove("hidden");
              } else {
                document.getElementById("filterDiv").classList.add("hidden");
              }
              filter = "Shows";
            }}><Tv size={15} /></button
          >
        </div>
      </div>
      <div
        on:mouseenter={removeHiddenSort}
        on:mouseleave={addHiddenSort}
        class="flex justify-center items-center text-slate-100 relative"
      >
        {#if sort === "AZ"}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}><AlphaDown /></button
          >
        {:else if sort === "ZA"}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}><AlphaUp /></button
          >
        {:else if sort === "most recent"}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}><SortRecent /></button
          >
        {:else}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}><SortOldest /></button
          >
        {/if}
        <!-- IGNORE ERROR ABOUT HIDDEN AND FLEX APPLYING THE SAME PROPERTY-->
        <div
          class="hidden absolute flex flex-col justify-center items-center -top-1 bg-slate-300 text-slate-800 rounded-md"
          id="sortDiv"
        >
          <button
            class={sort === "AZ"
              ? "bg-slate-800 text-slate-100 px-4 py-2 flex justify-center items-center"
              : "px-4 py-2 flex justify-center items-center hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document.getElementById("sortDiv").classList.contains("hidden")
              ) {
                document.getElementById("sortDiv").classList.remove("hidden");
              } else {
                document.getElementById("sortDiv").classList.add("hidden");
              }
              sort = "AZ";
            }}><AlphaDown /></button
          >
          <button
            class={sort === "ZA"
              ? "bg-slate-800 text-slate-100 px-4 py-2 flex justify-center items-center"
              : "px-4 py-2 flex justify-center items-center hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document.getElementById("sortDiv").classList.contains("hidden")
              ) {
                document.getElementById("sortDiv").classList.remove("hidden");
              } else {
                document.getElementById("sortDiv").classList.add("hidden");
              }
              sort = "ZA";
            }}><AlphaUp /></button
          >
          <button
            class={sort === "most recent"
              ? "bg-slate-800 text-slate-100 px-4 py-2 flex justify-center items-center"
              : "px-4 py-2 flex justify-center items-center hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document.getElementById("sortDiv").classList.contains("hidden")
              ) {
                document.getElementById("sortDiv").classList.remove("hidden");
              } else {
                document.getElementById("sortDiv").classList.add("hidden");
              }
              sort = "most recent";
            }}><SortRecent /></button
          >
          <button
            class={sort === "oldest"
              ? "bg-slate-800 text-slate-100 px-4 py-2 flex justify-center items-center"
              : "px-4 py-2 flex justify-center items-center hover:bg-slate-800 hover:text-slate-100"}
            on:click={() => {
              if (
                document.getElementById("sortDiv").classList.contains("hidden")
              ) {
                document.getElementById("sortDiv").classList.remove("hidden");
              } else {
                document.getElementById("sortDiv").classList.add("hidden");
              }
              sort = "oldest";
            }}><SortOldest /></button
          >
        </div>
      </div>
      <div>
        <button class="bg-slate-700 text-slate-100 p-4" on:click={toggleDisplay}
          >{#if displayType === "list"}
            <GridView />
          {:else}
            <ListView />
          {/if}
        </button>
      </div>
    </div>
  </div>
  {#if listItems.length}
    <FilteredList {displayType} {filter} {sort} />
  {:else}
    <div class="w-sm" />
  {/if}
</div>
