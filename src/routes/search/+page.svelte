<script lang="ts">
  import type { PageData } from "./$types";
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import UserList from "$lib/UserList/UserList.svelte";
  import type { listItemPlusMedia } from "$lib/types";
  import { Trash2, Tv, Film } from "lucide-svelte";
  import missingPoster from "$lib/images/posterunavailable.jpg";
  export let data: PageData;

  let results = data.data.results;
  let listItemsArray: listItemPlusMedia[];
  $: listItemsArray = $listItems;
</script>

<div class="grid grid-cols-12 pr-8" style="min-height: calc(100vh - 112px);">
  <UserList listItems={listItemsArray} />
  <section class="flex flex-col justify-center col-span-10 mr-10 mt-4">
    <p class="tracking-wide text-center my-4">
      search results for "{data.query}"...
    </p>
    <div class="w-full h-full flex flex-col justify-center items-center">
      {#each results as item}
        {#if item.media_type === "movie"}
          <div
            class="flex justify-center items-center gap-8 bg-orange-500 p-2 border-b-2 border-black border-solid max-h-96 w-auto"
          >
            {#if item.poster_path}
              <img
                class="max-h-80"
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={`${item.title} poster`}
              />
            {:else}
              <img
                class="max-h-80"
                src={missingPoster}
                alt={`${item.title}s poster is missing from the database`}
              />
            {/if}
            <div class="flex flex-col justify-center max-w-md p-4">
              <Film class="self-end mr-4" size={20} />
              <a data-sveltekit-reload href={`/movies/${item.id}`}>
                <h2
                  class="tracking-wide my-8 text-white text-3xl font-semibold"
                >
                  {item.title}
                </h2>
              </a>
              <p class="tracking-wide leading-relaxed m-w-full">
                {item.overview.slice(0, 150) + "..."}
              </p>
            </div>
          </div>
        {:else if item.media_type === "tv"}
          <div
            class="flex justify-center items-center gap-8 bg-orange-500 p-2 border-b-2 border-black border-solid max-h-96 w-fit"
          >
            {#if item.poster_path}
              <img
                class="max-h-80"
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={`${item.title} poster`}
              />
            {:else}
              <img
                class="max-h-80"
                src={missingPoster}
                alt={`${item.title}s poster is missing from the database`}
              />
            {/if}
            <div class="flex flex-col justify-center max-w-md p-4 w-1/2">
              <Tv class="self-end mr-4" size={20} />
              <a data-sveltekit-reload href={`/shows/${item.id}`}>
                <h2
                  class="tracking-wide my-8 text-white text-3xl font-semibold"
                >
                  {item.name}
                </h2>
              </a>
              <p class="tracking-wide leading-relaxed w-full">
                {item.overview.slice(0, 150) + "..."}
              </p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </section>
</div>
