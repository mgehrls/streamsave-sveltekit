<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const { item: media } = data;
</script>

<svelte:head>
  <title>Movies</title>
  <meta
    name="description"
    content="Details about a specific movies based on id"
  />
</svelte:head>

<section class="mt-8 w-screen flex justify-center items-center">
  <div class="flex justify-center items-center gap-8 max-w-5xl">
    <img
      src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
      alt={`${media.title} poster`}
    />
    <div class="flex flex-col justify-start items-start gap-4 w-1/2">
      <h1 class="m-0 text-black self-start">{media.title}</h1>
      <div class="flex">
        <a
          class="pr-8"
          rel="noreferrer"
          target="_blank"
          href={`https://www.imdb.com/title/${media.imdb_id}/`}>IMDB</a
        >
        <a
          class="pr-8"
          rel="noreferrer"
          target="_blank"
          href={`${media.homepage}`}>Website</a
        >
      </div>
      <p>{data.item.overview}</p>
      <div class="flex gap-4">
        <button>Does Nothing</button>
        <button>Placeholder</button>
      </div>
    </div>
  </div>
</section>
