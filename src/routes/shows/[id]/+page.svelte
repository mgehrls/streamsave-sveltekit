<script lang="ts">
  import type { PageData } from "./$types";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
  import { goto, afterNavigate } from "$app/navigation";
  import { ArrowLeft } from "lucide-svelte";
  import LayoutWrapper from "$lib/components/LayoutWrapper.svelte";
  import GenrePill from "$lib/utils/GenrePill.svelte";
  import FavoriteButton from "$lib/utils/FavoriteButton.svelte";

  let previousPage: string = "/";

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });

  export let data: PageData;
  const { item: media } = data;

  let loading: boolean = false;
  let innerWidth: number;
  $: listItemsArray = $listItems;
  $: if ($listItems) {
    loading = false;
  }

  async function handleDelete() {
    loading = true;
    await deleteListItem(media.id);
  }
  async function handleAdd() {
    loading = true;
    await addListItem(
      {
        id: media.id,
        title: media.title ? media.title : media.name,
        description: media.overview,
        type: media.title ? "movie" : "show",
        backdrop_path: `https://image.tmdb.org/t/p/w342${media.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w342${media.poster_path}`,
      },
      data.session.user.id
    );
  }
</script>

<svelte:head>
  <title>{"StreamSave: " + media.name}</title>
  <meta name="description" content={`Details about ${media.title}`} />
</svelte:head>
<svelte:window bind:innerWidth />

<LayoutWrapper>
  <section
    class="relative min-w-full min-h-full flex flex-col justify-center items-center gap-4 p-4 md:flex-row flex-1 my-8 mt-16"
  >
    <button
      on:click={() => goto(previousPage)}
      class="absolute top-0 left-4 text-2xl text-slate-50 z-50"
    >
      <ArrowLeft size={45} />
    </button>
    <div class="w-3/4 grid place-content-center relative">
      <img
        class="shadow-md"
        src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
        alt={`${media.title} poster`}
      />
      <div>
        <FavoriteButton
          {loading}
          onList={listItemsArray.map((item) => item.media_id).includes(media.id)
            ? true
            : false}
          {handleAdd}
          {handleDelete}
        />
      </div>
    </div>
    <div class="w-3/4 md:w-3/4 md:py-20 grid place-content-center md:px-16">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl font-bold text-slate-50">
            {media.name}
          </h1>
          <hr class="text-slate-100" />
        </div>
        <div class="flex gap-2 flex-wrap">
          {#each media.genres as genre}
            <GenrePill genre={genre.name} />
          {/each}
          {#if media.imdb_id}
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://www.imdb.com/title/${media.imdb_id}/`}
            >
              <img src="/images/imdb link.png" alt="IMDB link" />
            </a>
          {/if}
        </div>
        <div>
          <p class="text-slate-400 tracking-wide">{media.overview}</p>
        </div>
      </div>
    </div>
  </section>
</LayoutWrapper>
