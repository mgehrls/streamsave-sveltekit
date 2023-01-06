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

<div class="main">
  {#if listItems}
    <div class="userList">
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
