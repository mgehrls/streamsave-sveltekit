<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/utils/types";
  import { Film, Tv } from "lucide-svelte";
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

  const buttonClasses =
    "bg-slate-700 text-slate-100 px-2 py-1 relative rounded-lg h-8 max-w-12 flex justify-center items-center";
  const optionClasses = "w-full h-full flex justify-center items-center p-0";
  const divClasses =
    "max-w-12 hidden absolute top-0 left-0 flex flex-col justify-center items-center bg-slate-300 text-slate-800 rounded-lg z-10";

  function filterSortClasses(x: boolean) {
    if (x) {
      return "bg-slate-800 text-slate-100 py-2 px-4";
    } else {
      return "py-2 px-4 hover:bg-slate-800 hover:text-slate-100";
    }
  }

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
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-center font-bold text-2xl text-slate-100">Favorites</h2>
    <div class="text-sm flex items-center gap-2">
      <!-- Filter Button -->
      <div
        on:mouseenter={removeHiddenFilter}
        on:mouseleave={addHiddenFilter}
        class={buttonClasses}
      >
        {#if filter === "All"}
          <button class={optionClasses} on:click={addHiddenFilter}>All</button>
        {:else if filter === "Movies"}
          <button class={optionClasses} on:click={addHiddenFilter}
            ><Film size={15} /></button
          >
        {:else}
          <button class={optionClasses} on:click={addHiddenFilter}
            ><Tv size={15} /></button
          >
        {/if}
        <!-- IGNORE ERROR ABOUT HIDDEN AND FLEX APPLYING THE SAME PROPERTY-->
        <div class={divClasses} id="filterDiv">
          <button
            class={filterSortClasses(filter === "All")}
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
            class={filterSortClasses(filter === "Movies")}
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
            class={filterSortClasses(filter === "Shows")}
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
      <!-- Sort button-->
      <div
        on:mouseenter={removeHiddenSort}
        on:mouseleave={addHiddenSort}
        class={buttonClasses}
      >
        {#if sort === "AZ"}
          <button class={optionClasses} on:click={addHiddenSort}
            ><AlphaDown /></button
          >
        {:else if sort === "ZA"}
          <button class={optionClasses} on:click={addHiddenSort}
            ><AlphaUp /></button
          >
        {:else if sort === "most recent"}
          <button class={optionClasses} on:click={addHiddenSort}
            ><SortRecent /></button
          >
        {:else}
          <button class={optionClasses} on:click={addHiddenSort}
            ><SortOldest /></button
          >
        {/if}

        <!-- IGNORE ERROR ABOUT HIDDEN AND FLEX APPLYING THE SAME PROPERTY-->
        <div class={divClasses} id="sortDiv">
          <button
            class={filterSortClasses(sort === "AZ")}
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
            class={filterSortClasses(sort === "ZA")}
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
            class={filterSortClasses(sort === "most recent")}
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
            class={filterSortClasses(sort === "oldest")}
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
      <!-- Display button-->
      <div>
        <button class={buttonClasses} on:click={toggleDisplay}
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
  {/if}
</div>
