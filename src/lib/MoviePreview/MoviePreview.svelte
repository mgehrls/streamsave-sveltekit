<script lang="ts">
  import { addListItem } from "$lib/stores/listItems";
  import type { PageData } from "../../routes/$types";
  export let movie;
  export let data: PageData;
  const userID = data.session.user.id;
</script>

<div class="bg-gradient-to-t from-sky-400 to-sky-700 shadow mb-2 p-4 w-52 mr-1">
  <img
    src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
    alt={`${movie.title} backdrop`}
  />
  <div>
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

  <button
    on:click={() =>
      addListItem(
        {
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          type: movie.type,
          backdrop_path: `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
        },
        userID
      )}>Add</button
  >
</div>
