<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import UserList from "$lib/UserList/UserList.svelte";
  import { listItems } from "$lib/stores/listItems";
  import Welcome from "./Welcome.svelte";

  export let data: PageData;
  let isAThing: boolean = false;
  let innerWidth: number;
  let seeList: boolean = true;

  function toggleView() {
    seeList = !seeList;
  }

  $: listItemsArray = $listItems;
  $: listItemsArray.length ? (isAThing = true) : (isAThing = false);
  $: console.log(innerWidth);

  const trendingClasses =
    "relative overflow-auto overflow-y-hidden w-full mx-8 p-4";
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<svelte:window bind:innerWidth />

{#if !data.session}
  <Welcome />
{:else if innerWidth < 600}
  <div class=" flex justify-evenly my-8">
    <button
      class={seeList
        ? "bg-slate-700 text-slate-100 py-4 px-8 font-bold hover:bg-slate-200 hover:text-slate-600"
        : "bg-slate-100 text-slate-700 py-4 px-8 font-bold hover:bg-slate-600 hover:text-slate-200"}
      on:click={toggleView}>Your List</button
    >
    <button
      class={seeList
        ? "bg-slate-100 text-slate-700 py-4 px-8 font-bold hover:bg-slate-600 hover:text-slate-200"
        : "bg-slate-700 text-slate-100 py-4 px-8 font-bold hover:bg-slate-200 hover:text-slate-600"}
      on:click={toggleView}>Trending</button
    >
  </div>

  {#if seeList}
    <div class="grid place-content-center">
      <UserList listItems={listItemsArray} />
    </div>
  {:else}
    <section
      class="flex flex-col justify-center md:col-span-6 lg:col-span-10 mr-10 mt-4"
    >
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Trending Shows"}
          shows={trendingShowData}
        />
      </div>
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Popular Shows"}
          shows={popularShowData}
        />
      </div>
      <div class={trendingClasses}>
        <MoviePreview
          userID={data.session.user.id}
          title={"Popular Movies"}
          movies={popularMovieData}
        />
      </div>
    </section>
  {/if}
{:else}
  <div
    class={innerWidth > 600
      ? "grid md:grid-cols-8 lg:grid-cols-12 pr-8"
      : "flex flex-col justify-center items-center"}
    style="min-height: calc(100vh - 88px);"
  >
    <UserList listItems={listItemsArray} />
    <section
      class="flex flex-col justify-center md:col-span-6 lg:col-span-10 mr-10 mt-4"
    >
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Trending Shows"}
          shows={trendingShowData}
        />
      </div>
      <div class={trendingClasses}>
        <ShowPreview
          userID={data.session.user.id}
          title={"Popular Shows"}
          shows={popularShowData}
        />
      </div>
      <div class={trendingClasses}>
        <MoviePreview
          userID={data.session.user.id}
          title={"Popular Movies"}
          movies={popularMovieData}
        />
      </div>
    </section>
  </div>
{/if}
