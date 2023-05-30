<script lang="ts">
  import MediaPreviewMobile from "./MediaPreviewMobile.svelte";
  import type { ApiResult } from "$lib/utils/types";
  import { listItems } from "$lib/stores/listItems";
  import Swiper from "$lib/utils/Swiper.svelte";
  export let media: ApiResult[] = undefined;
  export let title: string;
  export let link: string = undefined;
  export let linkTitle: string = undefined;
  $: listItemsArray = $listItems.map((listItem) => listItem.media);
  $: innerWidth = innerWidth;
</script>

<svelte:window bind:innerWidth />

{#if !media && !listItemsArray.length}
  <div>No media here...</div>
{:else}
  <!--determine inner width first-->
  <div class="flex items-end gap-4 p-2 text-slate-100">
    <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
    {#if link}
      <a class="text-sm text-slate-400" id="linkID" href={link}>{linkTitle}</a>
    {/if}
  </div>
  {#if innerWidth < 1200}
    <!-- Mobile -->
    <div
      id="mediaRow"
      class="flex flex-1 p-2 w-full max-w-7xl gap-2 overflow-auto"
    >
      {#if !media}
        {#each listItemsArray as listItem}
          <MediaPreviewMobile {listItem} />
        {/each}
      {:else}
        {#each media as mediaItem}
          <MediaPreviewMobile {mediaItem} />
        {/each}
      {/if}
    </div>
  {:else}
    <!-- Desktop -->
    {#if !media}
      <div class="p-2">
        <Swiper {listItemsArray} />
      </div>
    {:else}
      <div class="p-2">
        <Swiper {media} />
      </div>
    {/if}
    <!-- Desktop -->
  {/if}
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
