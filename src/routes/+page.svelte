<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import { listItems } from "$lib/stores/listItems";
  import UserList from "$lib/UserList/UserList.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="main">
  <div class="bg-pink-600 w-12 h-12">Howdy</div>

  {#if $listItems}
    <div class="userList">
      <UserList listItems={$listItems} />
    </div>
  {/if}
  <section>
    <div class="trending">
      <ShowPreview
        title={"Trending Shows"}
        shows={data.trendingShowData}
        {data}
      />
    </div>
    <div class="trending">
      <ShowPreview
        title={"Popular Shows"}
        shows={data.popularShowData}
        {data}
      />
    </div>
    <div class="trending">
      <MoviePreview
        title={"Popular Movies"}
        movies={data.popularMovieData}
        {data}
      />
    </div>
  </section>
</div>

<style>
  div.main {
    justify-content: start;
    align-items: start;
    padding: 1rem;
    flex: 1;
    display: flex;
    width: 100%;
    margin: 4rem auto;
    box-sizing: border-box;
  }
  div.userList {
    min-width: 400px;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: calc(100% - 400px);
    flex: 0.6;
  }
  div.trending {
    overflow-y: hidden;
    position: relative;
    overflow: auto;
    width: calc(100% - 2rem);
    padding: 1rem;
  }
</style>
