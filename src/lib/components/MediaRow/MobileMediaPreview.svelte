<script lang="ts">
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia, SbMedia } from "$lib/utils/types";

  export let mediaItem: ApiResult = undefined;
  export let listItem: SbMedia = undefined;

  let listItemsArray: ListItemPlusMedia[];
  let mediaTitle =
    mediaItem !== undefined
      ? mediaItem.title
        ? mediaItem.title
        : mediaItem.name
      : undefined;

  $: listItemsArray = $listItems;
</script>

{#if listItem}
  <a
    class="relative flex flex-col justify-start items-center m-2 w-56 rounded-lg"
    style="max-width: 14rem; min-width: 14rem;"
    href={`/${listItem.type}s/${listItem.id}`}
  >
    <img
      draggable="false"
      class="rounded-md"
      src={`https://image.tmdb.org/t/p/w342${listItem.poster_path}`}
      alt={`${listItem.title} backdrop`}
    />
  </a>
{:else}
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
{/if}
