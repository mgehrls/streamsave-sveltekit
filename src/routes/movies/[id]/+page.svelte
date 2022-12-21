<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data);
</script>

<svelte:head>
  <title>Movies</title>
  <meta
    name="description"
    content="Details about a specific movies based on id"
  />
</svelte:head>

<section>
  <img
    src={`https://image.tmdb.org/t/p/w342/${data.item.poster_path}`}
    alt="movie poster"
  />
  <div class="infosec">
    <h1>{data.item.title}</h1>
    <p>{data.item.overview}</p>
    <div class="buttonsec">
      <button>Does nothing</button>
      <button>Placeholder</button>
    </div>
  </div>
</section>

<style>
  section {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  div.infosec {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
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
