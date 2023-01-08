<script>
  import { enhance } from "$app/forms";

  /**
   * @type {{ name: string; backdrop_path:string; id:string; overview:string; poster_path:string; }}
   */
  export let show;
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
  <form method="post" use:enhance action="?/addMedia">
    <input hidden name="title" value={show.name} />
    <input hidden name="description" value={show.overview} />
    <input hidden name="type" value="show" />
    <input hidden name="id" value={show.id} />
    <input
      hidden
      name="backdrop_path"
      value={`https://image.tmdb.org/t/p/w342${show.backdrop_path}`}
    />
    <input
      hidden
      name="poster_path"
      value={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
    />
    <button type="submit">Add</button>
  </form>
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
