<script lang="ts">
  import MediaPreview from "./MediaPreview.svelte";
  import { browser } from "$app/environment";
  import type { ApiResult } from "$lib/utils/types";
  import { Film, Tv } from "lucide-svelte";

  let innerWidth: number;

  export let media: ApiResult[];
  export let title: string;
  export let userID: string;
  export let indexID: string;
  export let type: "movie" | "show";
</script>

<svelte:window bind:innerWidth />

{#if !media}
  <div>No media here...</div>
{:else}
  <div class="flex flex-col pt-4 px-4 gap-2 max-w-full">
    <div class="flex gap-2 text-slate-100">
      {#if type === "show"}
        <Tv />
      {:else}
        <Film />
      {/if}
      <h2 class="text-slate-100 font-bold text-xl">{title}</h2>
    </div>
    {#if browser}
      <div
        id={indexID}
        class="flex flex-1 w-full max-w-7xl overflow-auto scrollbar-thin scrollbar-track-sky-100 scrollbar-thumb-sky-300 scrollbar-corner-transparent"
      >
        {#each media as mediaItem}
          <MediaPreview {mediaItem} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
