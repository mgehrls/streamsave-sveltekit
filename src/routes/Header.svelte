<script lang="ts">
  import type { PageData } from "./$types";
  import { fade } from "svelte/transition";

  import LayoutWrapper from "$lib/utils/LayoutWrapper.svelte";
  import SearchBar from "$lib/components/SearchBar/SearchBar.svelte";
  export let data: PageData;

  let gotUser: boolean = false;

  $: if (data.session !== null) {
    gotUser = true;
  }
</script>

<header class="bg-slate-800 text-white sticky top-0 z-30">
  <LayoutWrapper>
    <div
      class="py-4 flex gap-2 mx-4 lg:px-0 justify-between items-center relative"
    >
      <div class="flex items-center">
        <a
          href="/"
          class="text-xl flex gap-1 items-end font-bold tracking-wide"
        >
          <img
            src="/images/streamsave_logo.png"
            alt="StreamSave Logo"
            class="w-6"
          />
          <div class="hidden sm:block">
            <h1>treamSave</h1>
          </div>
        </a>
      </div>
      {#if gotUser}
        <button
          class="flex justify-center items-center gap-2"
          on:keydown={(e) => {
            if (e.key === "Enter")
              document.getElementById("menu").classList.toggle("hidden");
          }}
          on:click={() => {
            document.getElementById("menu").classList.toggle("hidden");
          }}
        >
          {#if data.session.user.user_metadata.name}
            <img
              class="rounded-full w-12"
              src={data.session.user.user_metadata.avatar_url
                ? data.session.user.user_metadata.avatar_url
                : "/images/missingprofilepic.png"}
              alt=""
            />
          {:else}
            <img
              class="rounded-full w-12"
              src="/images/missingprofilepic.png"
              alt=""
            />
          {/if}
        </button>
      {:else}
        <div class="flex justify-center items-center gap-4">
          <a
            data-sveltekit-reload
            class="px-6 py-2 bg-pink-600"
            target="_self"
            href="/signin">Sign in</a
          >
          <a data-sveltekit-reload class="px-6 py-2 bg-sky-600" href="/register"
            >Register</a
          >
        </div>
      {/if}
      <nav
        transition:fade
        id="menu"
        class="absolute z-50 mt-2 top-8 right-4 py-2 bg-gray-800 text-white rounded-lg hidden"
      >
        <form method="post" action="/signout">
          <button type="submit">Sign Out</button>
        </form>
      </nav>
    </div>
    {#if gotUser}
      <SearchBar {data} />
    {/if}
  </LayoutWrapper>
  <hr />
</header>
