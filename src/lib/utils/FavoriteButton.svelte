<script lang="ts">
  import Loading from "./Loading.svelte";
  import { Heart, HeartCrack } from "lucide-svelte";

  export let loading: boolean;
  export let onList: boolean;
  export let handleDelete: () => void;
  export let handleAdd: () => void;
  export let size: "sm" | "md" | "lg" = "md";

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

{#if loading}
  <button
    class="w-full text-white bg-sky-600 px-8 py-4 justify-center items-center"
  >
    <Loading />
  </button>
{:else if onList}
  <button
    class={size === "sm"
      ? "w-full text-white bg-sky-600 flex gap-2 px-8 py-4 justify-center items-center"
      : "w-full text-white bg-sky-600 flex gap-2 px-8 py-4 justify-center items-center"}
    on:click={unHoverDelete}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
  >
    {#if !hovered}
      <Heart color={"red"} fill={"red"} />
      <p class="text-sm">Favorited</p>
    {:else}
      <HeartCrack color={"red"} />
      <p>Unfavorite</p>
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
    <p class="text-sm">Favorite!</p>
  </button>
{/if}
