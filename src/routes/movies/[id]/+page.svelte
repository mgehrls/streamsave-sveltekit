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

<section class="mt-6 mb-24 w-screen flex justify-center items-center">
  <div
    class="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl"
  >
    <img
      class="px-4"
      src={`https://image.tmdb.org/t/p/w342${media.backdrop_path}`}
      alt={`${media.title} poster`}
    />
    <div
      class="flex flex-col justify-start items-start gap-4 w-full px-4 md:w-1/2"
    >
      <h2 class="m-0 font-bold text-lg text-slate-100 self-start">
        {media.title}
      </h2>
      <div class="flex gap-4 justify-center items-center">
        <a
          class="px-4 py-2 bg-slate-600 text-slate-100 rounded-md hover:bg-slate-300 hover:text-slate-900"
          rel="noreferrer"
          target="_blank"
          href={`https://www.imdb.com/title/${media.imdb_id}/`}>IMDB</a
        >
        <a
          class="px-4 py-2 bg-slate-600 text-slate-100 rounded-md hover:bg-slate-300 hover:text-slate-900"
          rel="noreferrer"
          target="_blank"
          href={`${media.homepage}`}>Website</a
        >
      </div>
      <p class="text-slate-100">{data.item.overview}</p>
      <div class="flex gap-4">
        <button
          class="px-4 py-2 bg-slate-600 text-slate-100 rounded-md hover:bg-slate-300 hover:text-slate-900"
          >make add button work here.</button
        >
      </div>
    </div>
  </div>
</section>
