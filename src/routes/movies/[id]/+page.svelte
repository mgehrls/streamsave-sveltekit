<script lang="ts">
  import AddRemoveBtn from "$lib/AddRemoveBtn.svelte";
  import type { PageData } from "./$types";
  import {
    addListItem,
    deleteListItem,
    listItems,
  } from "$lib/stores/listItems";
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
  <title>{"StreamSave: " + media.title}</title>
  <meta name="description" content={`Details about ${media.title}`} />
</svelte:head>
<svelte:window bind:innerWidth />

<section class="mt-8 w-screen flex justify-center items-center">
  <div
    class={innerWidth < 490
      ? "max-w-5xl flex flex-col justify-center items-center gap-8 px-4"
      : "max-w-5xl flex justify-center items-center gap-8 px-4"}
  >
    <div class="relative">
      <img
        src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
        alt={`${media.title} poster`}
      />
      <div class="absolute top-4 right-4">
        <AddRemoveBtn
          {loading}
          onList={listItemsArray.map((item) => item.media_id).includes(media.id)
            ? true
            : false}
          {handleAdd}
          {handleDelete}
        />
      </div>
      <div class="flex mt-4 gap-4 justify-center items-center">
        <a
          class="border border-slate-300 border-solid px-4 py-1 text-slate-100"
          rel="noreferrer"
          target="_blank"
          href={`https://www.imdb.com/title/${media.imdb_id}/`}>IMDB</a
        >
        <a
          class="border border-slate-300 border-solid px-4 py-1 text-slate-100"
          rel="noreferrer"
          target="_blank"
          href={`${media.homepage}`}>Website</a
        >
      </div>
    </div>
    <div
      class={innerWidth < 490
        ? "flex flex-col justify-start items-start gap-4 bg-slate-500 p-4"
        : "flex flex-col justify-start items-start gap-4 bg-slate-500 p-4 w-1/2 max-h-full"}
    >
      <h1 class="m-0 p-0 text-lg font-semibold text-slate-100 self-start">
        {media.title}
      </h1>
      <p class="m-0 p-0 text-slate-100 italic opacity-90">"{media.tagline}"</p>

      <p class="text-slate-100">{data.item.overview}</p>
    </div>
  </div>
</section>
