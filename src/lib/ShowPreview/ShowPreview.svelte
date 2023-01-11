<script lang="ts">
  import { addListItem } from "$lib/stores/listItems";
  import type { PageData } from "../../routes/$types";
  export let show;
  export let data: PageData;
  const userID = data.session.user.id;
</script>

<div class="card">
  <img
    src={`https://image.tmdb.org/t/p/w342${show.backdrop_path}`}
    alt={`${show.name} backdrop`}
  />
  <div class="link">
    <a href={`/shows/${show.id}`}>
      <h2>{show.name}</h2>
      <p>{show.overview.slice(0, 40)}...</p>
    </a>
  </div>

  <button
    on:click={() =>
      addListItem(
        {
          id: show.id,
          title: show.name,
          description: show.overview,
          type: show.type,
          backdrop_path: `https://image.tmdb.org/t/p/w342${show.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w342${show.poster_path}`,
        },
        userID
      )}>Add</button
  >
</div>

<style>
  div.card {
    background-image: linear-gradient(to top, #4075a6 0%, #1a4e7f 100%);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
    margin-bottom: 0.5rem;
    padding: 1rem;
  }
  a {
    padding: 1rem;
  }
  h2,
  p {
    text-decoration: none;
    color: white;
    text-shadow: 2px 2px 2px black;
    margin: 0;
  }
  h2 {
    font-weight: bold;
    font-size: large;
  }
  p {
    font-size: small;
  }
</style>
