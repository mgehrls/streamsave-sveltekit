<script lang="ts">
  import Loading from "./Loading.svelte";
  import { Heart, HeartCrack } from "lucide-svelte";

  export let loading: boolean;
  export let onList: boolean;
  export let handleDelete: () => void;
  export let handleAdd: () => void;

  let confirmDelete: boolean = false;

  let hovered: boolean = false;

  function unHoverDelete() {
    hovered = false;
    handleDelete();
  }
  function unHoverAdd() {
    loading = true;
    hovered = false;
    handleAdd();
  }
</script>

{#if loading}
  <div class="bg-black bg-opacity-50 rounded-bl-lg absolute top-0 right-0">
    <Loading />
  </div>
{:else if onList}
  <div class="bg-black bg-opacity-50 rounded-bl-lg absolute top-0 right-0">
    {#if !confirmDelete}
      <button
        class="p-1 text-white"
        on:click={() => (confirmDelete = true)}
        on:mouseenter={() => (hovered = true)}
        on:mouseleave={() => (hovered = false)}
      >
        {#if !hovered}
          <Heart color={"red"} fill={"red"} />
        {:else}
          <HeartCrack color={"red"} />
        {/if}
      </button>
    {:else}
      <div class="p-1 flex justify-between items-center text-slate-100 w-full">
        <p class="text-sm mr-4">Delete?</p>
        <button class="mr-8" on:click={unHoverDelete}>Yes</button>
        <button on:click={() => (confirmDelete = false)}>X </button>
      </div>
    {/if}
  </div>
{:else}
  <div class="bg-black bg-opacity-50 rounded-bl-lg absolute top-0 right-0">
    <button
      class="p-1 text-white"
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

    <button />
  </div>
{/if}
