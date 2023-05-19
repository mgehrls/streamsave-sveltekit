<script lang="ts">
  import MediaPreviewMobile from "./MediaPreviewMobile.svelte";
  import MediaPreviewDesktop from "./MediaPreviewDesktop.svelte";
  import type { ApiResult } from "$lib/utils/types";
  import { listItems } from "$lib/stores/listItems";

  export let media: ApiResult[] = undefined;
  export let title: string;
  export let link: string = undefined;
  export let linkTitle: string = undefined;
  $: listItemsArray = $listItems.map((listItem) => listItem.media);
  $: innerWidth = innerWidth;

  function handleMouseLeave() {
    document.getElementById("linkID").classList.add("hidden");
  }
  function handleMouseEnter() {
    document.getElementById("linkID").classList.remove("hidden");
  }
</script>

<svelte:window bind:innerWidth />

{#if !media && !listItemsArray.length}
  <div>No media here...</div>
{:else}
  <div
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    class="flex flex-col pt-4 px-4 gap-2 max-w-full"
  >
    <div class="flex items-end gap-2 text-slate-100">
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
      {#if link}
        <a id="linkID" class="hidden block" href={link}>{linkTitle}</a>
      {/if}
    </div>
    <div id="mediaRow" class="flex flex-1 w-full max-w-7xl gap-2 overflow-auto">
      {#if !media && listItemsArray.length}
        {#each listItemsArray as listItem}
          {#if innerWidth < 1536}
            <MediaPreviewMobile {listItem} />
          {:else}
            <MediaPreviewMobile {listItem} />
          {/if}
        {/each}
      {:else}
        {#each media as mediaItem}
          {#if innerWidth < 1536}
            <MediaPreviewMobile {mediaItem} />
          {:else}
            <MediaPreviewMobile {mediaItem} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
{/if}

<style>
  #mediaRow::-webkit-scrollbar {
    display: none;
  }

  #mediaRow {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  #mediaRow::-webkit-scrollbar-thumb {
    background: #4b5563;
  }

  #mediaRow::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
</style>
