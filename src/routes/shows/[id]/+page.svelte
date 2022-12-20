<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data);
</script>

<svelte:head>
  <title>Shows</title>
  <meta
    name="description"
    content="Details about a specific show based on id"
  />
</svelte:head>

<section>
  <img
    src={`https://image.tmdb.org/t/p/w342/${data.item.poster_path}`}
    alt="show poster"
  />
  <h1>{data.item.name}</h1>
  <p>{data.item.overview}</p>
</section>

<style>
  section {
    margin-top: 100px;
  }
  h1 {
    color: black;
  }
</style>
