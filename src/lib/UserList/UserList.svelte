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
  let showFilter: boolean = false;
  let showSort: boolean = false;

  const buttonClasses =
    "bg-slate-700 text-slate-100 px-2 py-1 relative rounded-lg h-8 max-w-12 flex justify-center items-center";

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

      <!-- Sort button-->

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
