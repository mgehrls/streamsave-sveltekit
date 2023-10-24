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

<div
  on:mouseenter={() =>
    document.getElementById(`hiddenDiv${i}`).classList.remove("hidden")}
  on:mouseleave={() =>
    document.getElementById(`hiddenDiv${i}`).classList.add("hidden")}
  class="relative w-32 rounded-lg"
>
  <img
    class="w-32 relative transition-all rounded-lg"
    style="height: 200px"
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
  <!-- flex and hidden are both required for this to work. Ignore the error -->
  <div
    id={"hiddenDiv" + i}
    class="flex flex-col justify-center items-start hidden absolute top-0 left-0 w-full h-full transition-all gap-2 p-2 rounded-lg"
    style="background-color: rgba(0,0,0,.7);"
  >
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
    <!-- popular show data doesn't have a media type, so  -->
    <h1 class="text-md text-slate-100 font-bold">
      {item
        ? item.title
        : mediaItem.media_type === "tv" || mediaType === "tv"
        ? mediaItem.name
        : mediaItem.title}
    </h1>
    <a
      class="text-sm text-slate-100 p-4 mt-2 bg-slate-900 absolute bottom-0 right-0 rounded-tl-lg"
      href={item
        ? `/${item.type}s/${item.id}`
        : mediaItem.media_type === "tv" || mediaType === "tv"
        ? `/shows/${mediaItem.id}`
        : `movies/${mediaItem.id}`}>{"See more ->"}</a
    >
  </div>
</div>
