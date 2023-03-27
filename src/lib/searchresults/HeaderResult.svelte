<script lang="ts">
  import AddRemoveBtn from "$lib/utils/AddRemoveBtn.svelte";
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import { Tv, Film } from "lucide-svelte";
  export let item;
  export let userID: string;
  let loading: boolean = false;

  $: listItemsArray = $listItems;
  $: if ($listItems) {
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

<div class="relative max-w-xs">
  {#if item.backdrop_path}
    <img
      alt={item.title ? item.title + " backdrop" : item.name + " backdrop"}
      src={`https://image.tmdb.org/t/p/w342${item.backdrop_path}`}
      class="bg-slate-800 px-4 py-2 flex flex-col justify-between items-center border-b border-solid border-slate-200"
    />
  {:else}
    <div class="h-48 w-full bg-black grid place-content-center">
      <p class="text-slate-100 opacity-50 max-w-xs">
        {item.overview ? item.overview.slice(0, 100) + "..." : "Image Missing"}
      </p>
    </div>
  {/if}
  <div class="flex items-center gap-4 absolute top-3 left-5">
    {#if item.media_type === "movie"}
      <div class="bg-black bg-opacity-50 rounded-lg">
        <Film class="m-1" />
      </div>
    {:else}
      <div class="bg-black bg-opacity-50 rounded-lg">
        <Tv class="m-1" />
      </div>
    {/if}
    <AddRemoveBtn
      {loading}
      onList={listItemsArray.map((item) => item.media_id).includes(item.id)
        ? true
        : false}
      {handleDelete}
      {handleAdd}
    />
  </div>
  <div
    class="absolute -bottom-2 bg-black bg-opacity-60 w-full flex justify-between items-center z-50"
  >
    <a
      href={item.media_type === "movie"
        ? `/movies/${item.id}`
        : `/shows/${item.id}`}
    >
      <h2
        class="font-bold pl-5 h-12 overflow-clip text-sm p-1 w-full text-ellipsis"
      >
        {item.title ? item.title : item.name}
      </h2>
    </a>
  </div>
</div>
