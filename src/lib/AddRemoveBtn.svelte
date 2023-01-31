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

{#if loading}
  <div class="bg-black bg-opacity-50 rounded-lg">
    <Loading />
  </div>
{:else if onList}
  <div class="bg-black bg-opacity-50 rounded-lg">
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
  <div class="bg-black bg-opacity-50 rounded-lg">
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
