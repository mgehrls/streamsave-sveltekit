<script lang="ts">
  import { register } from "swiper/element/bundle";
  import type { ApiResult, ListItemPlusMedia, SbMedia } from "$lib/utils/types";
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import AddRemoveBtn from "./AddRemoveBtn.svelte";
  let listItemsArray: ListItemPlusMedia[];
  let loading: boolean = false;
  let onList: boolean;
  let userID: string = undefined;
  const basePath = "https://image.tmdb.org/t/p/w342";
  export let mediaItem: ApiResult = undefined;
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
  $: if ($listItems) {
    loading = false;
    userID = $listItems[0].user_id;
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
        type: mediaItem.media_type === "movie" ? "movie" : "show",
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

{#if item !== undefined && item !== null}
  <div
    on:mouseenter={() =>
      document.getElementById(`hiddenDiv${i}`).classList.remove("hidden")}
    on:mouseleave={() =>
      document.getElementById(`hiddenDiv${i}`).classList.add("hidden")}
    class="relative"
  >
    <img
      class="w-52 relative transition-all"
      style="height: 307.5px"
      src={basePath + item.poster_path}
      alt={item.title + "poster."}
    />
    <div
      id={"hiddenDiv" + i}
      class="flex flex-col justify-center items-start hidden absolute top-0 left-0 w-full h-full transition-all gap-2 p-2"
      style="background-color: rgba(0,0,0,.7);"
    >
      <!--Todo add like button to this, then do all of this for media below-->
      <AddRemoveBtn
        {loading}
        {onList}
        handleDelete={() => handleDeleteForListItems()}
        handleAdd={() => handleAddForListItems()}
      />
      <h1 class="text-lg text-slate-100 font-bold">{item.title}</h1>
      <p class="text-sm text-slate-100">
        {item.description.substring(0, 100) + "..."}
      </p>
      <a
        class="text-lg text-slate-100 p-4 mt-2 bg-slate-900 absolute bottom-0 right-0 rounded-tl-lg"
        href={`/${item.type}s/${item.id}`}>{"See more ->"}</a
      >
    </div>
  </div>
{:else if mediaItem !== undefined && mediaItem !== null}
  <div
    on:mouseenter={() =>
      document.getElementById(`hiddenDiv${i}`).classList.remove("hidden")}
    on:mouseleave={() =>
      document.getElementById(`hiddenDiv${i}`).classList.add("hidden")}
    class="relative"
  >
    <img
      class="w-52 relative transition-all"
      style="height: 307.5px"
      src={basePath + mediaItem.poster_path}
      alt={mediaItem.title + "poster."}
    />
    <div
      id={"hiddenDiv" + i}
      class="flex flex-col justify-center items-start hidden absolute top-0 left-0 w-full h-full transition-all gap-2 p-2"
      style="background-color: rgba(0,0,0,.7);"
    >
      <!--Todo add like button to this, then do all of this for media below-->
      <AddRemoveBtn
        {loading}
        {onList}
        handleDelete={() => handleDeleteForOtherItems()}
        handleAdd={() => handleAddForOtherItems()}
      />
      <h1 class="text-lg text-slate-100 font-bold">
        {mediaItem.title ? mediaItem.title : mediaItem.name}
      </h1>
      <p class="text-sm text-slate-100">
        {mediaItem.overview.substring(0, 100) + "..."}
      </p>
      <a
        class="text-lg text-slate-100 p-4 mt-2 bg-slate-900 absolute bottom-0 right-0 rounded-tl-lg"
        href={`/${mediaItem.media_type === "movie" ? "movie" : "show"}s/${
          mediaItem.id
        }`}>{"See more ->"}</a
      >
    </div>
  </div>
{/if}
