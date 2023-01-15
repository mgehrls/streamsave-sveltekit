<script lang="ts">
  import ShowPreview from "./ShowPreview.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import type { PageData } from "../../routes/$types";

  let Carousel: ConstructorOfATypedSvelteComponent; // for saving Carousel component class

  export let shows: string | any[];
  export let title: string;
  export let data: PageData;

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
        <ShowPreview {show} {data} />
      {/each}
    </svelte:component>
  {/if}
{/if}
