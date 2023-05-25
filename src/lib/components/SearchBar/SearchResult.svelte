<script lang="ts">
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import FavoriteButton from "$lib/utils/FavoriteButton.svelte";
  import GenrePill from "$lib/utils/GenrePill.svelte";
  import { genreList } from "$lib/utils/genres";
  export let item;
  export let userID: string;
  export let clearSearch: () => void;
  let loading: boolean = false;
  let onList: boolean;

  $: genres = item.genre_ids
    ? item.genre_ids.map((id) => genreList.find((g) => g.id === id).name || [])
    : [];
  $: listItemsArray = $listItems;
  $: if ($listItems) {
    loading = false;
  }
  $: onList = listItemsArray.includes(
    listItemsArray.find((i) => i.media.id === item.id)
  );

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
  class="flex justify-center items-center w-full max-w-7xl border-b border-white pb-4"
>
  {#if item.poster_path}
    <a
      href={item.title ? `/movies/${item.id}` : `/shows/${item.id}`}
      class="w-1/2 flex justify-center items-center"
      on:click={clearSearch}
    >
      <img
        alt={item.title ? item.title + " poster" : item.name + " poster"}
        src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
        class="max-h-72"
      />
    </a>
  {:else}
    <a
      href={item.title ? `/movies/${item.id}` : `/shows/${item.id}`}
      class="w-1/2 flex justify-center items-center"
      on:click={clearSearch}
    >
      <img
        alt={item.title ? item.title + " poster" : item.name + " poster"}
        src="/images/posterunavailable.png"
        class="max-h-72"
      />
    </a>
  {/if}
  <div class="w-1/2 h-full flex flex-col justify-start items-start p-4 gap-2">
    <a
      on:click={clearSearch}
      href={item.title ? `/movies/${item.id}` : `/shows/${item.id}`}
      class=""
    >
      <h2 class="text-white text-sm md:text-lg text-left">
        {item.title ? item.title : item.name}
      </h2>
    </a>
    <div class="flex gap-1 overflow-x-hidden">
      {#each genres as genre}
        <GenrePill {genre} />
      {/each}
    </div>
    <div class="">
      <FavoriteButton size="sm" {onList} {loading} {handleAdd} {handleDelete} />
    </div>
  </div>
</div>
