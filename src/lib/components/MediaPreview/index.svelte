<script lang="ts">
  import MediaPreview from "./MediaPreview.svelte";
  import { browser } from "$app/environment";
  import type { ApiResult } from "$lib/utils/types";
  import { Film, Tv } from "lucide-svelte";
  import { onMount } from "svelte";

  let innerWidth: number;
  let particles: number;

  export let media: ApiResult[];
  export let title: string;
  export let userID: string;
  export let indexID: string;
  export let type: "movie" | "show";

  $: {
    particles = Math.round((innerWidth - 840) / 200) + 2;
  }

  onMount(async () => {
    const slider = document.getElementById(indexID) as HTMLDivElement;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-speed
      slider.scrollLeft = scrollLeft - walk;
    });
  });
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
      <div id={indexID} class="flex flex-1 w-full max-w-6xl overflow-auto">
        {#each media as mediaItem}
          <MediaPreview {type} {userID} {mediaItem} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
