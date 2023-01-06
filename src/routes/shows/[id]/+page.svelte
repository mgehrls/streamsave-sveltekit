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
      <h1>{media.name}</h1>
      <p class="tagline">"{media.tagline}"</p>
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
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  div.links a {
    padding-right: 2rem;
    border: 1px solid #4075a6;
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
    padding: 0;
  }
  p.tagline {
    margin: 0;
    padding: 0;
    font-style: italic;
    opacity: 0.9;
  }
</style>
