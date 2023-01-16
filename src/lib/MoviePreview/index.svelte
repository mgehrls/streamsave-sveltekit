<script lang="ts">
  import MoviePreview from "./MoviePreview.svelte";
  import { browser } from "$app/environment";
  import { onMount, SvelteComponentTyped, type ComponentType } from "svelte";
  import type { apiMovieResult } from "$lib/types";
  import type { PageData } from "../../routes/$types";

  let Carousel: ComponentType<SvelteComponentTyped>;

  export let movies: apiMovieResult[];
  export let title: string;
  export let data: PageData;

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
