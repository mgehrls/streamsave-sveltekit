<script lang="ts">
  import { listItems } from "$lib/stores/listItems";
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

  console.log(mediaItem);

  let mediaType =
    mediaItem !== undefined
      ? mediaItem.media_type === "tv"
        ? "show"
        : "movie"
      : undefined;

  $: listItemsArray = $listItems;
</script>

{#if listItem}
  <a
    class="my-2 mr-2 w-56 rounded-lg"
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
  <a class="my-2 mr-2 w-56 rounded-lg" href={`/${mediaType}s/${mediaItem.id}`}>
    <img
      draggable="false"
      class="rounded-md"
      src={`https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`}
      alt={`${mediaTitle} backdrop`}
    />
  </a>
{/if}
