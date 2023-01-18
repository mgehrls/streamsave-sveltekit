<script lang="ts">
  import ShowPreview from "./ShowPreview.svelte";
  import { browser } from "$app/environment";
  import { onMount, SvelteComponentTyped, type ComponentType } from "svelte";
  import type { apiShowResult } from "$lib/types";

  let Carousel: ComponentType<SvelteComponentTyped>;

  export let shows: apiShowResult[];
  export let title: string;

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });
</script>

{#if !shows}
  <div class="movies-preview">No shows are here...</div>
{:else}
  <h2 class="font-bold text-xl ml-8 my-2">{title}</h2>
  {#if browser}
    <svelte:component
      this={Carousel}
      particlesToShow={5}
      particlesToScroll={4}
      dots={false}
      arrows={true}
    >
      {#each shows as show}
        <ShowPreview {show} />
      {/each}
    </svelte:component>
  {/if}
{/if}
