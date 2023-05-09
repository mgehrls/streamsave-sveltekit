<script lang="ts">
  import AddRemoveBtn from "$lib/utils/AddRemoveBtn.svelte";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia, SbMedia } from "$lib/utils/types";

  export let mediaItem: ApiResult;
  export let userID: string;

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;
  let mediaTitle = mediaItem ? mediaItem.title : mediaItem.name;

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
        title:
          mediaItem.media_type === "show" ? mediaItem.name : mediaItem.title,
        description: mediaItem.overview,
        type: mediaItem.media_type,
        backdrop_path: `https://image.tmdb.org/t/p/w342${mediaItem.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`,
      },
      userID
    );
  }
</script>

<a
  class="relative flex flex-col justify-start items-center m-2 w-56 rounded-lg"
  style="max-width: 14rem; min-width: 14rem;"
  href={`/${mediaItem.media_type}s/${mediaItem.id}`}
>
  <img
    draggable="false"
    class="rounded-md"
    src={`https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`}
    alt={`${mediaTitle} backdrop`}
  />
</a>
