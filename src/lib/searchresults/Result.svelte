<script lang="ts">
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import { Tv, Film } from "lucide-svelte";
  import missingPoster from "$lib/images/posterunavailable.jpg";
  import type { ApiResult, ListItemPlusMedia } from "$lib/types";
  import AddRemoveBtn from "$lib/AddRemoveBtn.svelte";

  export let item: ApiResult;
  export let userID: string;

  let loading: boolean = false;
  let listItemsArray: ListItemPlusMedia[];
  $: {
    listItemsArray = $listItems;
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(item.id);
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: item.id,
        title: item.title ? item.title : item.name,
        description: item.overview,
        type: item.title ? "movie" : "show",
        backdrop_path: `https://image.tmdb.org/t/p/w342${item.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
      },
      userID
    );
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
      <AddRemoveBtn
        {loading}
        onList={listItemsArray.map((item) => item.media_id).includes(item.id)
          ? true
          : false}
        {handleAdd}
        {handleDelete}
      />
    </div>
  </div>
</div>
