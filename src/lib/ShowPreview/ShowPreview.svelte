<script lang="ts">
  import Loading from "$lib/Loading.svelte";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/types";
  import { Heart, HeartCrack } from "lucide-svelte";

  export let show: ApiResult;
  export let userID: string;

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;
  let hovered: boolean = false;

  $: listItemsArray = $listItems;
  $: onList = listItemsArray.map((item) => item.media_id).includes(show.id);
  $: if ($listItems) {
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(show.id);
    hovered = false;
  }
  async function handleAdd() {
    loading = true;
    hovered = false;
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

<div class="max-w-xs flex flex-col justify-start items-center bg-slate-800 p-1">
  <img
    class="max-w-xs max-h-60"
    src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
    alt={`${show.name} backdrop`}
  />
  <div class="self-start w-full max-w-xs p-2">
    <a class="" href={`/shows/${show.id}`}>
      <h2
        class="no-underline text-white max-w-xs font-semibold truncate"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.name}
      </h2>
      <p
        class="no-underline text-white m-0 text-sm overflow-hidden text-ellipsis whitespace-normal h-16"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.overview.slice(0, 40)}...
      </p>
    </a>
  </div>
  {#if loading}
    <Loading />
  {:else if onList}
    <button
      class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:scale-110 self-start"
      on:click={handleDelete}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
    >
      {#if !hovered}
        <Heart color={"red"} fill={"red"} />
      {:else}
        <HeartCrack color={"red"} />
      {/if}
    </button>
  {:else if !onList}
    <button
      class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:scale-110 self-start"
      on:click={handleAdd}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
    >
      {#if hovered}
        <Heart fill={"red"} />
      {:else}
        <Heart />
      {/if}
    </button>
  {:else}
    <a href="/login">
      <p>Please log in.</p>
    </a>
  {/if}
</div>
