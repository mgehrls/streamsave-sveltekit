<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";
  import { Film, Tv, History, SortAsc, SortDesc } from "lucide-svelte";
  import FilteredList from "./FilteredList.svelte";

  export let listItems: ListItemPlusMedia[];

  let filter: "All" | "Shows" | "Movies" = "All";
  let sort: "AZ" | "ZA" | "most recent" | "oldest" = "AZ";

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
</script>

<div class="flex flex-col">
  <div>
    <h2 class="pt-4 text-center font-bold text-xl text-slate-100">Your List</h2>
    <!-- Filter -->
    <div class="text-sm flex justify-around items-center">
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
            on:click={addHiddenSort}>AZ <SortDesc size={15} /></button
          >
        {:else if sort === "ZA"}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}>AZ <SortAsc size={15} /></button
          >
        {:else if sort === "most recent"}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}
            ><History size={15} /> <SortAsc size={15} /></button
          >
        {:else}
          <button
            class="flex justify-center items-center gap-1 text-white bg-slate-600 px-4 py-1 rounded-md"
            on:click={addHiddenSort}
            ><History size={15} /> <SortDesc size={15} /></button
          >
        {/if}
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
            }}>AZ <SortDesc size={15} /></button
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
            }}>AZ <SortAsc size={15} /></button
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
            }}><History size={15} /> <SortAsc size={15} /></button
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
            }}><History size={15} /> <SortDesc size={15} /></button
          >
        </div>
      </div>
    </div>
  </div>
  {#if listItems.length}
    <FilteredList {filter} {sort} />
  {:else}
    <div class="w-sm" />
  {/if}
</div>
