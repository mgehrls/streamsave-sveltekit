<script lang="ts">
  import { listItems } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia, SbMedia } from "$lib/utils/types";

  export let mediaItem: ApiResult = undefined;
  export let listItem: SbMedia = undefined;

  const anchorClasses =
    "transform hover:scale-125 z-0  inline-block flex flex-col justify-start mb-2 items-center w-56 rounded-lg overflow-visible";
  const basePath = "https://image.tmdb.org/t/p/w342";
  const anchorStyles = `max-width: 18rem; min-width: 18rem; background-image: url(${
    listItem
      ? basePath + listItem.backdrop_path
      : basePath + mediaItem.backdrop_path
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
  <div>
    <a
      class={anchorClasses}
      style={anchorStyles}
      draggable="false"
      href={`/${listItem.type}s/${listItem.id}`}
      aria-label={`Go to ${listItem.title} page`}
    >
      <img
        draggable="false"
        class="rounded-lg"
        src={basePath + listItem.backdrop_path}
        alt={`${listItem.title} backdrop`}
      />
    </a>
  </div>
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
      src={basePath + mediaItem.backdrop_path}
      alt={`${mediaTitle} backdrop`}
    />
  </a>
{/if}
