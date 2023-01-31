<script lang="ts">
  import AddRemoveBtn from "$lib/AddRemoveBtn.svelte";
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

<div
  class="bg-slate-800 px-4 py-2 flex flex-col justify-between items-center border-b border-solid border-slate-200"
>
  <div class="flex items-center gap-4 relative bg-purple-400">
    {#if item.media_type === "movie"}
      <div class="absolute top-2 bg-black bg-opacity-50 rounded-lg">
        <Film class="m-1" />
      </div>
    {:else}
      <div class="absolute top-2 bg-black bg-opacity-50 rounded-lg">
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
    {#if item.backdrop_path}
      <img
        class="h-24"
        alt={item.title ? item.title + " backdrop" : item.name + " backdrop"}
        src={`https://image.tmdb.org/t/p/w342${item.backdrop_path}`}
      />
    {:else}
      <div
        class="flex justify-center items-center"
        style="height: 96px; width:171px;"
      >
        Image Missing...
      </div>
    {/if}
  </div>
  <div class="w-full flex h-12 justify-between items-center">
    <a
      href={item.media_type === "movie"
        ? `/movies/${item.id}`
        : `/shows/${item.id}`}
    >
      <h2 class="font-bold h-12 overflow-clip text-sm p-1 w-full text-ellipsis">
        {item.title ? item.title : item.name}
      </h2>
    </a>
  </div>
</div>
