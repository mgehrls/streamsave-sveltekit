<script lang="ts">
  import AddRemoveBtn from "$lib/utils/AddRemoveBtn.svelte";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/utils/types";
  import { genreList, getGenresByIds } from "$lib/utils/genres";
  import GenrePill from "$lib/utils/GenrePill.svelte";

  export let mediaItem: ApiResult;
  export let userID: string;
  export let type: "movie" | "show";

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;
  let mediaTitle = type === "show" ? mediaItem.name : mediaItem.title;
  let genresIDs = mediaItem.genre_ids;
  let genres = getGenresByIds(genresIDs, genreList);

  $: listItemsArray = $listItems;
  $: onList = listItemsArray
    .map((item) => item.media_id)
    .includes(mediaItem.id);
  $: if ($listItems) {
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(mediaItem.id);
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: mediaItem.id,
        title: type === "show" ? mediaItem.name : mediaItem.title,
        description: mediaItem.overview,
        type: type,
        backdrop_path: `https://image.tmdb.org/t/p/w342${mediaItem.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`,
      },
      userID
    );
  }
</script>

<div
  class="relative flex flex-col justify-start items-center bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-900 p-4 w-56"
  style="max-width: 14rem; min-width: 14rem;"
>
  <div class="absolute top-4 right-4">
    {#if userID}
      <AddRemoveBtn {loading} {onList} {handleDelete} {handleAdd} />
    {:else}
      <a href="/signin">
        <p class="text-slate-100">Sign in</p>
      </a>
    {/if}
  </div>
  <a class="" href={`/${type}s/${mediaItem.id}`}>
    <img
      draggable="false"
      style="width:208px; pointer-events: none; height:312px;"
      src={`https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`}
      alt={`${mediaTitle} backdrop`}
    />
  </a>
  <div class="self-start w-full p-2">
    <a class="" href={`/${type}s/${mediaItem.id}`}>
      <h2
        class="no-underline text-white font-semibold truncate"
        style="text-shadow: 0 2px 4px black;"
      >
        {mediaTitle}
      </h2>
    </a>
    <div class="flex flex-wrap gap-1">
      {#each genres as genre}
        <GenrePill {genre} />
      {/each}
    </div>
  </div>
</div>
