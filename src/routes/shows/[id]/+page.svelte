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
  <div class="max-w-5xl flex justify-center items-center gap-8">
    <img
      src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
      alt={`${media.title} poster`}
    />
    <div class="flex flex-col justify-start items-start gap-4 w-1/2">
      <h1 class="m-0 p-0 text-slate-100 self-start">{media.name}</h1>
      <p class="m-0 p-0 italic opacity-90">"{media.tagline}"</p>
      <div class="flex gap-4 justify-center items-center">
        <a
          class="border border-blue-700 border-solid pr-8"
          rel="noreferrer"
          target="_blank"
          href={`https://www.imdb.com/title/${media.imdb_id}/`}>IMDB</a
        >
        <a
          class="border border-blue-700 border-solid pr-8"
          rel="noreferrer"
          target="_blank"
          href={`${media.homepage}`}>Website</a
        >
      </div>
      <p class="text-slate-100">{data.item.overview}</p>
      <div class="flex gap-4">
        <button>Does Nothing</button>
        <button>Placeholder</button>
      </div>
    </div>
  </div>
</section>
