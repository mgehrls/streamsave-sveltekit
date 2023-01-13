<script lang="ts">
  import ShowPreview from "./ShowPreview.svelte";
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
  <div class="movies-preview">No shows are here...</div>
{:else}
  <h2 class="font-bold text-lg text-white m-0">{title}</h2>
  {#if browser}
    <svelte:component
      this={Carousel}
      particlesToShow={4}
      particlesToScroll={3}
      dots={true}
      arrows={true}
    >
      {#each shows as show}
        <ShowPreview {show} {data} />
      {/each}
    </svelte:component>
  {/if}
{/if}
