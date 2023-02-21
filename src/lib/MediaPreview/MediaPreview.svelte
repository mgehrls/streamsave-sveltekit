<script lang="ts">
  import AddRemoveBtn from "$lib/AddRemoveBtn.svelte";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/types";

  export let mediaItem: ApiResult;
  export let userID: string;
  export let type: "movie" | "show";

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;
  let mediaTitle = type === "show" ? mediaItem.name : mediaItem.title;

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
  class="flex flex-col justify-start items-center bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-900 p-4 w-56"
>
  <img
    class="max-w-xs max-h-60"
    src={`https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`}
    alt={`${mediaTitle} backdrop`}
  />
  <div class="self-start w-full max-w-xs p-2">
    <a class="" href={`/${type}s/${mediaItem.id}`}>
      <h2
        class="no-underline text-white max-w-xs font-semibold truncate"
        style="text-shadow: 0 2px 4px black;"
      >
        {mediaTitle}
      </h2>
      <p
        class="no-underline text-white m-0 text-sm overflow-hidden text-ellipsis whitespace-normal h-16"
        style="text-shadow: 0 2px 4px black;"
      >
        {mediaItem.overview.slice(0, 40)}...
      </p>
    </a>
  </div>
  <div class="my-1 mr-2 self-end">
    {#if userID}
      <AddRemoveBtn {loading} {onList} {handleDelete} {handleAdd} />
    {:else}
      <a href="/signin">
        <p class="text-slate-100">Sign in</p>
      </a>
    {/if}
  </div>
</div>
