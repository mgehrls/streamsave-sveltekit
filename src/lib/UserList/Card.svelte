<script lang="ts">
  import { listItems } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/utils/types";

  export let mediaItem: ApiResult = undefined;
  export let listItem: ListItemPlusMedia = undefined;

  const anchorClasses =
    "relative flex flex-col justify-start items-center rounded-lg";
  const basePath = "https://image.tmdb.org/t/p/w342";
  const anchorStyles = `max-width: 9rem; min-width: 3rem; background-image: url(${
    listItem
      ? basePath + listItem.media.poster_path
      : basePath + mediaItem.poster_path
  }); background-size: cover`;

  let listItemsArray: ListItemPlusMedia[];

  let mediaTitle =
    mediaItem !== undefined
      ? mediaItem.title
        ? mediaItem.title
        : mediaItem.name
      : undefined;

  let mediaType: "movie" | "show" =
    mediaItem !== undefined && mediaItem.release_date ? "movie" : "show";

  $: listItemsArray = $listItems;
</script>

{#if listItem}
  <a
    class={anchorClasses}
    style={anchorStyles}
    draggable="false"
    href={`/${listItem.media.type}s/${listItem.media_id}`}
    aria-label={`Go to ${listItem.media.title} page`}
  >
    <img
      draggable="false"
      class="rounded-lg"
      src={basePath + listItem.media.poster_path}
      alt={`${listItem.media.title} backdrop`}
    />
  </a>
{:else}
  <a
    class={anchorClasses}
    style={anchorStyles}
    draggable="false"
    href={`/${mediaType}s/${mediaItem.id}`}
    aria-label={`Go to ${mediaTitle} page`}
  >
    <img
      draggable="false"
      class="rounded-lg"
      src={basePath + mediaItem.poster_path}
      alt={`${mediaTitle} backdrop`}
    />
  </a>
{/if}
