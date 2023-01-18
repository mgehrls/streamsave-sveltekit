<script lang="ts">
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import { user } from "$lib/stores/userStore";
  import type { apiMovieResult, listItemPlusMedia } from "$lib/types";
  import { PlusCircle, MinusCircle } from "lucide-svelte";

  export let movie: apiMovieResult;
  let listItemsArray: listItemPlusMedia[];
  let onList: boolean;
  let loggedIn: boolean;
  let userID: string;
  let loading: boolean;

  $: loggedIn = $user ? true : false;
  $: listItemsArray = $listItems;
  $: onList = listItemsArray.map((item) => item.media_id).includes(movie.id);
  $: userID = $user.id;

  async function handleDelete() {
    loading = true;
    await deleteListItem(movie.id);
    loading = false;
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        type: "movie",
        backdrop_path: `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
      },
      userID
    );
    loading = false;
  }
</script>

<div
  class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52 flex flex-col justify-center items-center"
>
  <img
    src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
    alt={`${movie.title} backdrop`}
  />
  <div class="self-start">
    <a class="p-4" href={`/movies/${movie.id}`}>
      <h2
        class="no-underline text-white m-0 text-lg font-bold"
        style="text-shadow: 0 2px 4px black;"
      >
        {movie.title}
      </h2>
      <p
        class="no-underline text-white m-0 text-sm"
        style="text-shadow: 0 2px 4px black;"
      >
        {movie.overview.slice(0, 40)}...
      </p>
    </a>
  </div>
  {#if loading}
    <div>loading...</div>
  {:else if loggedIn && onList}
    <button
      class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:bg-red-600 hover:scale-110 self-start"
      on:click={handleDelete}
    >
      <MinusCircle />
    </button>
  {:else if loggedIn && !onList}
    <button
      class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:bg-green-600 hover:scale-110 self-start"
      on:click={handleAdd}
    >
      <PlusCircle />
    </button>
  {:else}
    <a href="/login">
      <p>Please log in.</p>
    </a>
  {/if}
</div>
