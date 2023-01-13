<script lang="ts">
  import ShowPreview from "./ShowPreview.svelte";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Carousel: ConstructorOfATypedSvelteComponent; // for saving Carousel component class

  export let shows: string | any[];
  export let title: string;
  export let data;

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });
</script>

{#if !shows}
  <div transition:fade class="movies-preview">No shows are here...</div>
{:else}
  <h2 class="font-bold text-lg text-white m-0">{title}</h2>
  {#if browser}
    <svelte:component
      this={Carousel}
      particlesToShow={5}
      particlesToScroll={4}
      dots={true}
      arrows={true}
    >
      ...
      {#each shows as show}
        <ShowPreview {show} {data} />
      {/each}
    </svelte:component>
  {/if}
{/if}

<style>
  .trendingRow {
    margin-top: 1rem;
    scrollbar-width: thin;
    display: flex;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    overflow: auto;
    width: 100%;
    gap: 1rem;
  }
  .trendingRow::-webkit-scrollbar:horizontal {
    height: 0;
    width: 0;
    display: none;
  }

  .trendingRow::-webkit-scrollbar-thumb:horizontal {
    display: none;
  }
</style>
