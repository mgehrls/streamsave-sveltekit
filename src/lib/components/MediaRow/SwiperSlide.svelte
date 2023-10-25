<script lang="ts">
  import { register } from "swiper/element/bundle";
  import type { ApiResult, ListItemPlusMedia, SbMedia } from "$lib/utils/types";
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import AddRemoveBtn from "../../utils/AddRemoveBtn.svelte";
  let listItemsArray: ListItemPlusMedia[];
  let loading: boolean = false;
  let onList: boolean;
  let userID: string = undefined;
  const basePath = "https://image.tmdb.org/t/p/w342";
  export let mediaItem: ApiResult = undefined;
  export let mediaType: "tv" | "movie" = undefined;
  export let item: SbMedia = undefined;
  export let i: string;

  $: {
    loading = false;
    listItemsArray = $listItems;
  }
  $: if (!item) {
    onList = listItemsArray.includes(
      listItemsArray.find((i) => i.media.id === mediaItem.id)
    );
  } else {
    onList = listItemsArray.includes(
      listItemsArray.find((i) => i.media.id === item.id)
    );
  }
  $: if ($listItems.length) {
    loading = false;
    userID = listItemsArray[0].user_id;
  }
  register();

  function handleAddForListItems() {
    loading = true;
    addListItem(item, userID);
  }
  function handleAddForOtherItems() {
    loading = true;
    addListItem(
      {
        title: mediaItem.title ? mediaItem.title : mediaItem.name,
        description: mediaItem.overview,
        type: mediaItem.media_type === "tv" ? "show" : "movie",
        poster_path: mediaItem.poster_path,
        backdrop_path: mediaItem.backdrop_path,
        id: mediaItem.id,
      },
      userID
    );
  }
  function handleDeleteForListItems() {
    loading = true;
    deleteListItem(item.id);
  }
  function handleDeleteForOtherItems() {
    loading = true;
    deleteListItem(mediaItem.id);
  }
</script>

<!-- image aspect ratio to deal with outliers and genre / tags -->

<div id={i} class="p-2 bg-slate-800">
  <!-- image -->
  <div class="relative">
    <img
      class="w-full h-full relative transition-all"
      src={item
        ? basePath + item.poster_path
        : mediaItem
        ? basePath + mediaItem.poster_path
        : undefined}
      alt={item
        ? item.title + "poster."
        : mediaItem
        ? mediaItem.title + "poster."
        : undefined}
    />
    <AddRemoveBtn
      {loading}
      {onList}
      handleDelete={item
        ? () => handleDeleteForListItems()
        : () => handleDeleteForOtherItems()}
      handleAdd={item
        ? () => handleAddForListItems()
        : () => handleAddForOtherItems()}
    />
  </div>

  <!-- title & genre-->
  <div class="h-20 p-2">
    <div class="h-2/3">
      <a
        href={item
          ? `/${item.type}s/${item.id}`
          : mediaItem.media_type === "tv" || mediaType === "tv"
          ? `/shows/${mediaItem.id}`
          : `movies/${mediaItem.id}`}
      >
        <h2
          class="text-lg text-slate-100 font-bold leading-5 tracking-wider"
          style="overflow: hidden; display:-webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
        >
          {item
            ? item.title
            : mediaItem.media_type === "tv" || mediaType === "tv"
            ? mediaItem.name
            : mediaItem.title}
        </h2>
      </a>
    </div>
    <div class="h-1/3 text-slate-100">
      {#if item}
        <p>tags coming soon</p>
      {:else if mediaItem}
        <p>media Item tags</p>
      {/if}
    </div>
  </div>
</div>
