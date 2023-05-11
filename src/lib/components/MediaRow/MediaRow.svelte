<script lang="ts">
  import MediaPreview from "./MediaPreview.svelte";
  import type { ApiResult } from "$lib/utils/types";
  import type { PageData } from "../../../routes/$types";
  import { listItems } from "$lib/stores/listItems";

  let innerWidth: number;
  export let page: PageData;
  export let media: ApiResult[] = undefined;
  export let title: string;

  $: listItemsArray = $listItems.map((listItem) => listItem.media);
  $: page;
</script>

<svelte:window bind:innerWidth />

{#if !media && !listItemsArray.length}
  <div>No media here...</div>
{:else}
  <div class="flex flex-col pt-4 px-4 gap-2 max-w-full">
    <div class="flex gap-2 text-slate-100">
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
    </div>
    <div
      class="flex flex-1 w-full max-w-7xl gap-2 overflow-auto scrollbar-track-transparent scrollbar-thumb-sky-300 scrollbar-corner-transparent"
    >
      {#if !media && listItemsArray.length}
        {#each listItemsArray as listItem}
          <MediaPreview {listItem} />
        {/each}
      {:else}
        {#each media as mediaItem}
          <MediaPreview {mediaItem} />
        {/each}
      {/if}
    </div>
  </div>
{/if}
