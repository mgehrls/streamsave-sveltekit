<script lang="ts">
  import { page } from "$app/stores";
  import { supabaseClient } from "$lib/supabase";
  let loading = false;

  export let movie: {
    title: string;
    backdrop_path: string;
    id: string;
    overview: string;
  };

  const handleClick = async () => {
    try {
      loading = true;
      const userid = $page.data.session?.user.id;
      console.log(userid, movie.id);
      let { error } = await supabaseClient
        .from("listItem")
        .upsert({ userId: userid, mediaID: movie.id });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
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

  <button on:click={handleClick}>Add</button>

  <button>Does Nothing</button>
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
