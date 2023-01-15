<script lang="ts">
  import { addListItem, deleteListItem } from "$lib/stores/listItems";
  import type { PageData } from "../../routes/$types";
  import { PlusCircle, MinusCircle } from "lucide-svelte";
  import { listItems } from "$lib/stores/listItems";

  export let show;
  export let data: PageData;

  const userID = data.session.user.id;
  let listItemIdArray;

  if ($listItems) {
    listItemIdArray = $listItems.map((item) => item.media_id);
  }
</script>

<div class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52 mr-1">
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
  {#if listItemIdArray.includes(show.id)}
    <button
      class="p-2 hover:text-white hover:bg-slate-800 rounded-xl flex gap-2 font-bold border-solid border-2 border-slate-800 hover:border-slate-500"
      on:click={() => deleteListItem(show.id)}
    >
      <MinusCircle />
      Remove
    </button>
  {:else}
    <button
      class="p-2 hover:text-white hover:bg-slate-800 rounded-xl flex gap-2 font-bold border-solid border-2 border-slate-800 hover:border-slate-500"
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
      Add
    </button>
  {/if}
</div>
