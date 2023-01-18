<script lang="ts">
  import { user } from "$lib/stores/userStore";
  let userData;

  $: userData = $user;
</script>

<header
  class="w-full flex justify-around items-center gap-4 sticky text-white p-4 z-100 h-100 bg-slate-700"
>
  <div class="logo">
    <a class="m-0 p-0" href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
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
      <img
        class="rounded-full h-12"
        src={userData.user_metadata.picture}
        alt={userData.user_metadata.name
          .split(" ")[0]
          .slice(0, 1)
          .toUpperCase() +
          userData.user_metadata.name.split(" ")[1].slice(0, 1).toUpperCase()}
      />
      <form method="post" action="/logout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  {/if}
</header>
