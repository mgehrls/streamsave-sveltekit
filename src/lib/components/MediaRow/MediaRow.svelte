<script lang="ts">
  import type { ApiResult } from "$lib/utils/types";
  import { listItems } from "$lib/stores/listItems";
  import Swiper from "$lib/components/MediaRow/Swiper.svelte";
  export let media: ApiResult[] = undefined;
  export let title: string;
  export let link: string = undefined;
  export let linkTitle: string = undefined;
  $: listItemsArray = $listItems.map((listItem) => listItem.media);
  $: innerWidth = innerWidth;
</script>

{#if !media && !listItemsArray.length}
  <div>No media here...</div>
{:else}
  <div class="flex flex-col gap-2">
    <div class="flex items-end gap-4 text-slate-100">
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
      {#if link}
        <a class="text-sm text-slate-400" id="linkID" href={link}>{linkTitle}</a
        >
      {/if}
    </div>

    <div>
      {#if !media}
        <Swiper {listItemsArray} />
      {:else}
        <Swiper {media} />
      {/if}
    </div>
  </div>
{/if}
