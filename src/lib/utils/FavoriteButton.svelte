<script lang="ts">
  import Loading from "./Loading.svelte";
  import { Heart, HeartCrack } from "lucide-svelte";

  export let loading: boolean;
  export let onList: boolean;
  export let handleDelete: () => void;
  export let handleAdd: () => void;
  export let size: "sm" | "md" | "lg" = "md";

  const smallButtonClasses =
    "w-1/2 text-white bg-sky-600 flex gap-2 text-sm px-6 py-3 justify-center items-center";

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
      <h3 class="text-sm">Favorited</h3>
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
    <h3 class="text-sm">Favorite!</h3>
  </button>
{/if}
