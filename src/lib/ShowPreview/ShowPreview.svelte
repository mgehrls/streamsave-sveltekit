<script lang="ts">
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import type { apiShowResult } from "$lib/types";
  import { PlusCircle, MinusCircle } from "lucide-svelte";
  import type { PageData } from "../../routes/$types";

  export let show: apiShowResult;
  export let data: PageData;

  const userID = data.session.user.id;
  let listItemIdArray: number[];

  if ($listItems) {
    listItemIdArray = $listItems.map((item) => item.media_id);
  }
</script>

<div class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52">
  <img
    src={`https://image.tmdb.org/t/p/w342${show.backdrop_path}`}
    alt={`${show.name} backdrop`}
  />
  <div>
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
  {#if data.listItems.data.find((item) => item.media_id === show.id)}
    <button
      class="p-2 text-white bg-slate-800 rounded-md flex gap-2 hover:bg-red-600 hover:scale-110"
      on:click={() => deleteListItem(show.id)}
    >
      <MinusCircle />
    </button>
  {:else}
    <button
      class="p-2 text-white bg-slate-800 rounded-xl flex gap-2 hover:bg-green-600 hover:scale-110"
      on:click={() =>
        addListItem(
          {
            id: show.id,
            title: show.name,
            description: show.overview,
            type: "show",
            backdrop_path: `https://image.tmdb.org/t/p/w342${show.backdrop_path}`,
            poster_path: `https://image.tmdb.org/t/p/w342${show.poster_path}`,
          },
          userID
        )}
    >
      <PlusCircle />
    </button>
  {/if}
</div>
