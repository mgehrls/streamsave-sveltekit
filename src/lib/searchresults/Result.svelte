<script lang="ts">
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import { Tv, Film, PlusCircle, MinusCircle } from "lucide-svelte";
  import missingPoster from "$lib/images/posterunavailable.jpg";
  import type { ApiResult, ListItemPlusMedia } from "$lib/types";
  import Loading from "$lib/Loading.svelte";

  export let item: ApiResult;
  export let userID: string;
  export let type: "movie" | "tv";

  let loading: boolean = false;
  let listItemsArray: ListItemPlusMedia[];
  $: {
    listItemsArray = $listItems;
    loading = false;
  }
</script>

<div
  class="flex justify-center items-center gap-8 bg-slate-700 p-2 border-b-2 border-black border-solid max-h-96 w-auto"
>
  {#if item.poster_path}
    <img
      class="max-h-80"
      src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
      alt={item.title ? `${item.title} poster` : `${item.name} poster`}
    />
  {:else}
    <img
      class="max-h-80"
      src={missingPoster}
      alt={item.media_type === "movie"
        ? `${item.title}s poster is missing from the database`
        : `${item.name}s poster is missing from the database`}
    />
  {/if}
  <div class="flex flex-col justify-center max-w-md p-4">
    {#if item.media_type === "movie"}
      <Film class="self-end mr-4" size={20} />
    {:else if item.media_type === "tv"}
      <Tv class="self-end mr-4" size={20} />
    {/if}
    <a
      data-sveltekit-reload
      href={item.media_type === "movie"
        ? `/movies/${item.id}`
        : `/shows/${item.id}`}
    >
      <h2 class="tracking-wide my-8 text-white text-3xl font-semibold">
        {item.media_type === "movie" ? item.title : item.name}
      </h2>
    </a>
    <p class="tracking-wide leading-relaxed m-w-full">
      {item.overview ? item.overview.slice(0, 150) + "..." : ""}
    </p>
    <div class="my-4">
      {#if loading}
        <Loading />
      {:else if listItemsArray.map((item) => item.media_id).includes(item.id)}
        <button
          class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:bg-red-600 hover:scale-110 self-start"
          on:click={() => {
            loading = true;
            deleteListItem(item.id);
          }}
        >
          <MinusCircle />
          Remove
        </button>
      {:else}
        <button
          class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:bg-green-600 hover:scale-110 self-start"
          on:click={() => {
            loading = true;
            const mediaToSend = {
              backdrop_path: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
              poster_path: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
              description: item.overview,
              id: item.id,
              title: type === "movie" ? item.title : item.name,
              type: type === "movie" ? "movie" : "show",
            };
            addListItem(mediaToSend, userID);
          }}
        >
          <PlusCircle />
          Add
        </button>
      {/if}
    </div>
  </div>
</div>
