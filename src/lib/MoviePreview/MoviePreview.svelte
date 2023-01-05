<script lang="ts">
  export let movie: {
    title: string;
    backdrop_path: string;
    poster_path: string;
    id: string;
    overview: string;
  };
</script>

<div class="card">
  <img
    src={`https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`}
    alt={`${movie.title} backdrop`}
  />
  <div class="link">
    <a href={`/movies/${movie.id}`}>
      <h2>{movie.title}</h2>
      <p>{movie.overview.slice(0, 40)}...</p>
    </a>
  </div>
  <form method="post" action="?/addMedia">
    <input hidden name="title" value={movie.title} />
    <input hidden name="description" value={movie.overview} />
    <input hidden name="type" value="movie" />
    <input hidden name="id" value={movie.id} />
    <input hidden name="backdrop_path" value={movie.backdrop_path} />
    <input hidden name="poster_path" value={movie.poster_path} />
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
