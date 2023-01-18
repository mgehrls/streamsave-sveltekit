<script lang="ts">
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import { user } from "$lib/stores/userStore";
  import type { apiShowResult, listItemPlusMedia } from "$lib/types";
  import { PlusCircle, MinusCircle } from "lucide-svelte";

  export let show: apiShowResult;
  let listItemsArray: listItemPlusMedia[];
  let onList: boolean;
  let loggedIn: boolean;
  let userID: string;
  let loading: boolean;

  $: loggedIn = $user ? true : false;
  $: listItemsArray = $listItems;
  $: onList = listItemsArray.map((item) => item.media_id).includes(show.id);
  $: userID = $user.id;

  async function handleDelete() {
    loading = true;
    await deleteListItem(show.id);
    loading = false;
  }
  async function handleAdd() {
    loading = true;
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
    loading = false;
  }
</script>

<div
  class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52 flex flex-col justify-center items-center"
>
  <img
    src={`https://image.tmdb.org/t/p/w342${show.backdrop_path}`}
    alt={`${show.name} backdrop`}
  />
  <div class="self-start">
    <a class="p-4" href={`/shows/${show.id}`}>
      <h2
        class="no-underline text-white text-lg font-bold"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.name}
      </h2>
      <p
        class="no-underline text-white m-0 text-sm"
        style="text-shadow: 0 2px 4px black;"
      >
        {show.overview.slice(0, 40)}...
      </p>
    </a>
  </div>
  {#if loading}
    <div class="p-1 self-start" role="status">
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
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
