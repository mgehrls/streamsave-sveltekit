<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data);
  const { item: media } = data;
</script>

<svelte:head>
  <title>Movies</title>
  <meta
    name="description"
    content="Details about a specific movies based on id"
  />
</svelte:head>

<section>
  <div class="card">
    <img
      src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
      alt={`${media.title} poster`}
    />
    <div class="infosec">
      <h1>{media.title}</h1>
      <div class="links">
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://www.imdb.com/title/${media.imdb_id}/`}>IMDB</a
        >
        <a rel="noreferrer" target="_blank" href={`${media.homepage}`}
          >Website</a
        >
      </div>
      <p>{data.item.overview}</p>
      <div class="buttonsec">
        <button>Does Nothing</button>
        <button>Placeholder</button>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    margin-top: 2rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.card {
    max-width: 64rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  div.links {
    display: flex;
  }
  div.links a {
    padding-right: 2rem;
  }
  div.infosec {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    width: 50%;
  }
  div.buttonsec {
    display: flex;
    gap: 1rem;
  }
  h1 {
    color: black;
    align-self: start;
    margin: 0;
  }
</style>
