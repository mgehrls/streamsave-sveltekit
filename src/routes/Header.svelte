<script lang="ts">
  import { user } from "$lib/stores/userStore";
  import { getSearchResults, searchResults } from "$lib/stores/searchResults";
  import { goto, invalidateAll } from "$app/navigation";

  let userData;
  let searchQuery: string = "";
  let timer;
  let results;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getSearchResults(searchQuery);
    }, 1000);
  };

  $: userData = $user;
  $: results = $searchResults;
</script>

<header
  class="w-full flex justify-around items-center gap-4 sticky text-white p-4 z-100 h-100 bg-slate-700"
>
  <div class="logo">
    <a class="m-0 p-0" href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
  <input
    class="text-black"
    type="text"
    bind:value={searchQuery}
    on:input={debounce}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        goto(`/search?query=${searchQuery}`);
      } else if (e.key === "Escape") {
        searchQuery = "";
      }
    }}
  />
  {#if !userData}
    <div class="flex justify-center items-center gap-8">
      <a data-sveltekit-reload class="m-0 p-0" target="_self" href="/login"
        >Login</a
      >
      <a data-sveltekit-reload class="m-0 p-0" href="/register">Register</a>
    </div>
  {:else}
    <div class="flex justify-center items-center gap-2">
      <p>Welcome!</p>
      {#if userData.user_metadata.picture}
        <img
          class="rounded-full h-12"
          src={userData.user_metadata.picture}
          alt={userData.user_metadata.name
            .split(" ")[0]
            .slice(0, 1)
            .toUpperCase() +
            userData.user_metadata.name.split(" ")[1].slice(0, 1).toUpperCase()}
        />
      {:else}
        <div>
          <h3>
            {userData.user_metadata.name
              .split(" ")[0]
              .slice(0, 1)
              .toUpperCase() +
              userData.user_metadata.name
                .split(" ")[1]
                .slice(0, 1)
                .toUpperCase()}
          </h3>
        </div>
      {/if}
      <form method="post" action="/logout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  {/if}
</header>
