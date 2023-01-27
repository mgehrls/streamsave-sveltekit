<script lang="ts">
  import Loading from "$lib/Loading.svelte";
  import {
    listItems,
    addListItem,
    deleteListItem,
  } from "$lib/stores/listItems";
  import { Tv, Film, Heart, HeartCrack } from "lucide-svelte";
  export let item;
  export let userID: string;
  let loading: boolean = false;
  let hovered: boolean = false;

  $: listItemsArray = $listItems;
  $: if ($listItems) {
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(item.id);
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: item.id,
        title: item.title ? item.title : item.name,
        description: item.overview,
        type: item.title ? "movie" : "show",
        backdrop_path: `https://image.tmdb.org/t/p/w342${item.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
      },
      userID
    );
  }
</script>

<div class="bg-slate-800 p-4 flex justify-between items-center gap-8 h-32">
  <a
    href={item.media_type === "movie"
      ? `/movies/${item.id}`
      : `/shows/${item.id}`}
  >
    <div class="flex items-center h-28 gap-4 relative">
      {#if item.media_type === "movie"}
        <div class="absolute top-2 bg-black bg-opacity-50 rounded-lg">
          <Film class="m-1" />
        </div>
      {:else}
        <div class="absolute top-2 bg-black bg-opacity-50 rounded-lg">
          <Tv class="m-1" />
        </div>
      {/if}
      {#if item.backdrop_path}
        <img
          class="h-24"
          alt={item.title ? item.title + " backdrop" : item.name + " backdrop"}
          src={`https://image.tmdb.org/t/p/w342${item.backdrop_path}`}
        />
      {:else}
        <div
          class="flex justify-center items-center"
          style="height: 96px; width:171px;"
        >
          Image Missing...
        </div>
      {/if}
      <h2 class="my-4 font-bold">{item.title ? item.title : item.name}</h2>
    </div>
  </a>
  {#if loading}
    <Loading />
  {:else if listItemsArray.map((item) => item.media_id).includes(item.id)}
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
  {:else}
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
  {/if}
</div>
