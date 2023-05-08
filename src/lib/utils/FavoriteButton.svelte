<script lang="ts">
  import Loading from "./Loading.svelte";
  import { Heart, HeartCrack } from "lucide-svelte";

  export let loading: boolean;
  export let onList: boolean;
  export let handleDelete: () => void;
  export let handleAdd: () => void;

  let hovered: boolean = false;

  function unHoverDelete() {
    hovered = false;
    handleDelete();
  }
  function unHoverAdd() {
    hovered = false;
    handleAdd();
  }
</script>

<!--
      {#if loading}
        <div class="bg-black bg-opacity-50 rounded-full">
          <Loading />
        </div>
      {:else if onList}
        <div class="bg-black bg-opacity-50 rounded-full">
          <button
            class="p-1 text-white flex gap-2 hover:scale-110 self-start"
            on:click={unHoverDelete}
            on:mouseenter={() => (hovered = true)}
            on:mouseleave={() => (hovered = false)}
          >
            {#if !hovered}
              <Heart color={"red"} fill={"red"} />
            {:else}
              <HeartCrack color={"red"} />
            {/if}
          </button>
        </div>
      {:else}
        <div class="bg-black bg-opacity-50 rounded-full">
          <button
            class="p-1 text-white flex gap-2 hover:scale-110 self-start"
            on:click={unHoverAdd}
            on:mouseenter={() => (hovered = true)}
            on:mouseleave={() => (hovered = false)}
          >
            {#if hovered}
              <Heart fill={"red"} />
            {:else}
              <Heart />
            {/if}
          </button>
        </div>
      {/if}
  -->

{#if loading}
  <button
    class="w-full text-white bg-sky-600 px-8 py-4 justify-center items-center"
  >
    <Loading />
  </button>
{:else if onList}
  <button
    class="w-full text-white bg-sky-600 flex gap-2 px-8 py-4 justify-center items-center"
    on:click={unHoverDelete}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
  >
    {#if !hovered}
      <Heart color={"red"} fill={"red"} />
      <h3>Favorited</h3>
    {:else}
      <HeartCrack color={"red"} />
      <h3>Unfavorite</h3>
    {/if}
  </button>
{:else}
  <button
    class="w-full text-white bg-sky-600 flex gap-2 px-8 py-4 justify-center items-center"
    on:click={unHoverAdd}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
  >
    {#if hovered}
      <Heart fill={"red"} />
    {:else}
      <Heart />
    {/if}
    <h3>Favorite!</h3>
  </button>
{/if}
