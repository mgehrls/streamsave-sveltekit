<script lang="ts">
  import ShowPreview from "./ShowPreview.svelte";
  import { browser } from "$app/environment";
  import { onMount, SvelteComponentTyped, type ComponentType } from "svelte";
  import type { ApiResult } from "$lib/types";
  import { Tv } from "lucide-svelte";

  let Carousel: ComponentType<SvelteComponentTyped>;
  let innerWidth: number;
  let particles: number;

  export let shows: ApiResult[];
  export let title: string;
  export let userID: string;

  $: {
    // innerWidth > 1040 ? particles
  }
  $: {
    particles = Math.round((innerWidth - 840) / 200) + 2;
  }

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });
</script>

<svelte:window bind:innerWidth />

{#if !shows}
  <div class="movies-preview">No shows are here...</div>
{:else}
  <div
    class="mr-4"
    style={innerWidth > 700
      ? "max-width: calc(100vw - 380px)"
      : "max-width: 100%"}
  >
    <div class="flex gap-2 text-slate-100">
      <Tv />
      <h2 class="text-slate-100 font-bold text-xl mb-4">{title}</h2>
    </div>
    {#if browser}
      <svelte:component
        this={Carousel}
        particlesToShow={innerWidth < 1040 ? 2 : particles}
        particlesToScroll={innerWidth < 1040 ? 2 : particles - 1}
        dots={true}
        arrows={false}
        autoplay={true}
        autoplayDuration={8000}
        duration={800}
      >
        {#each shows as show}
          <ShowPreview {userID} {show} />
        {/each}
      </svelte:component>
    {/if}
  </div>
{/if}
