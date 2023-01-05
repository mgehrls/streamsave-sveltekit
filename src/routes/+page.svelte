<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import UserList from "$lib/UserList/UserList.svelte";
  export let data: PageData;
  export let form: ActionData;
  console.log(form);
  console.log(data.listItems);
  const listItems = data.listItems ? data.listItems : "";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  {#if listItems}
    <div>
      <UserList {listItems} />
    </div>
  {/if}
  <section>
    <div class="trending">
      <ShowPreview title={"Trending Shows"} shows={data.trendingShowData} />
    </div>
    <div class="trending">
      <ShowPreview title={"Popular Shows"} shows={data.popularShowData} />
    </div>
    <div class="trending">
      <MoviePreview title={"Popular Movies"} movies={data.popularMovieData} />
    </div>
  </section>
</main>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
  div.trending {
    overflow-y: hidden;
    position: relative;
    overflow: auto;
    width: 100%;
  }
</style>
