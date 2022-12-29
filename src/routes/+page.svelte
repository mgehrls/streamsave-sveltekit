<script lang="ts">
  import type { PageData } from "./$types";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import { enhance, type SubmitFunction } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";
  export let data: PageData;
  export let form;
  console.log(form);

  const { session, trendingShowData, popularMovieData, popularShowData } = data;

  const submitLogout: SubmitFunction = async ({ cancel }) => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  {#if data.session}
    <p>Welcome, {data.session.user.email}</p>
    <form action="/logout" method="POST" use:enhance={submitLogout}>
      <button type="submit" class="btn btn-primary">Logout</button>
    </form>
  {:else}
    <p>Let's learn how to register and login users!</p>
    <div class="auth-buttons">
      <a href="/login" class="btn btn-primary">Login</a>
      <a href="/register" class="btn btn-secondary">Register</a>
    </div>
  {/if}
  <section>
    <div class="trending">
      <ShowPreview title={"Trending Shows"} shows={trendingShowData} />
    </div>
    <div class="trending">
      <ShowPreview title={"Popular Shows"} shows={popularShowData} />
    </div>
    <div class="trending">
      <MoviePreview title={"Popular Movies"} movies={popularMovieData} />
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
