<script lang="ts">
  import { addListItem } from "$lib/stores/listItems";
  import type { PageData } from "../../routes/$types";
  export let show;
  export let data: PageData;
  const userID = data.session.user.id;
</script>

<div class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52">
  <img
    src={`https://image.tmdb.org/t/p/w342${show.backdrop_path}`}
    alt={`${show.name} backdrop`}
  />
  <div class="link">
    <a class="p-4" href={`/shows/${show.id}`}>
      <h2
        class="no-underline text-white m-0 text-lg font-bold"
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

  <button
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
      )}>Add</button
  >
</div>
