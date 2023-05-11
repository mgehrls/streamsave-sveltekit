<script lang="ts">
  import MediaPreview from "./MediaPreview.svelte";
  import type { ApiResult } from "$lib/utils/types";
  import type { PageData } from "../../../routes/$types";

  let innerWidth: number;
  export let page: PageData;
  export let media: ApiResult[] = undefined;
  export let title: string;

  const listItems = page.listItems.data.map((item) => item.media);

  const userID = page.session.user.id;

  //make default version if nothing comes in be user list. Then account for other media being inserted.
</script>

<svelte:window bind:innerWidth />

{#if !media && !listItems.length}
  <div>No media here...</div>
{:else if media}
  <div class="flex flex-col pt-4 px-4 gap-2 max-w-full">
    <div class="flex gap-2 text-slate-100">
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
    </div>
    <div
      class="flex flex-1 w-full max-w-6xl overflow-auto scrollbar-thin scrollbar-track-sky-100 scrollbar-thumb-sky-300 scrollbar-corner-transparent"
    >
      {#each media as mediaItem}
        <MediaPreview {userID} {mediaItem} />
      {/each}
    </div>
  </div>
{:else}
  <div class="flex flex-col pt-4 px-4 gap-2 max-w-full">
    <div class="flex gap-2 text-slate-100">
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
    </div>
    <div
      class="flex flex-1 w-full max-w-6xl overflow-auto scrollbar-thin scrollbar-track-sky-100 scrollbar-thumb-sky-300 scrollbar-corner-transparent"
    >
      {#each listItems as listItem}
        <MediaPreview {userID} {listItem} />
      {/each}
    </div>
  </div>
{/if}
