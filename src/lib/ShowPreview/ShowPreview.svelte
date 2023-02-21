<script lang="ts">
  import AddRemoveBtn from "$lib/AddRemoveBtn.svelte";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/types";

  export let show: ApiResult;
  export let userID: string;

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;

  $: listItemsArray = $listItems;
  $: onList = listItemsArray.map((item) => item.media_id).includes(show.id);
  $: if ($listItems) {
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(show.id);
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: show.id,
        title: show.name,
        description: show.overview,
        type: "show",
        backdrop_path: `https://image.tmdb.org/t/p/w342${show.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${show.poster_path}`,
      },
      userID
    );
  }
</script>

<div
  class="max-w-xs flex flex-col justify-start items-center bg-gradient-to-tr from-slate-800 to-slate-900 p-1"
>
  <img
    class="max-w-xs max-h-60 relative"
    src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
    alt={`${show.name} backdrop`}
  />
  <div class="self-start w-full max-w-xs p-2">
    <a class="" href={`/shows/${show.id}`}>
      <h2
        class="no-underline text-white py-2 max-w-xs font-semibold truncate"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.name}
      </h2>
      <p
        class="no-underline text-white m-0 text-sm overflow-hidden text-ellipsis whitespace-normal h-10 opacity-75"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.overview.slice(0, 40)}...
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
