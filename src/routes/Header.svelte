<script lang="ts">
  export let data;
  const session = data;
  let timer: string | number | NodeJS.Timeout | undefined;
</script>

<header
  class="w-full flex justify-around items-center gap-4 sticky text-white p-4 z-100 h-100 bg-slate-700"
>
  <div class="logo">
    <a class="m-0 p-0" href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
  <div>
    <input id="searchBarInput" class="searchBarInput" type="search" />
  </div>
  {#if !session}
    <div class="flex justify-center items-center gap-8">
      <a class="m-0 p-0" href="/login">Login</a>
      <a class="m-0 p-0" href="/register">Register</a>
    </div>
  {:else}
    <div class="flex justify-center items-center gap-2">
      <p>Welcome {session.user.user_metadata.name.split(" ")[0]}!</p>
      <img
        class="rounded-full h-12"
        src={session.user.user_metadata.avatar_url}
        alt="user avatar"
      />
      <form method="post" action="/logout">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  {/if}
</header>
