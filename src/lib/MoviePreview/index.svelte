<script lang="ts">
  import MoviePreview from "./MoviePreview.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Carousel: ConstructorOfATypedSvelteComponent;

  export let movies: string | any[];
  export let title: string;
  export let data;

  onMount(async () => {
    const module = await import("svelte-carousel");
    Carousel = module.default;
  });
</script>

{#if !movies}
  <div class="movies-preview">No movies are here...</div>
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
      {#each movies as movie}
        <MoviePreview {movie} {data} />
      {/each}
    </svelte:component>
  {/if}
{/if}
