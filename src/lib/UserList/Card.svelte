<script lang="ts">
  export let listItem: listItemPlusMedia;
  import { fade } from "svelte/transition";
  import { deleteListItem, updateListItemDate } from "$lib/stores/listItems";
  import { Trash2, Tv, Film } from "lucide-svelte";
  import type { listItemPlusMedia } from "$lib/types";
  import { list } from "postcss";
  let mediaType;

  if (listItem.media.type === "show") {
    mediaType = "Tv";
  } else {
    mediaType = "Film";
  }

  function handleDelete() {
    deleteListItem(listItem.media.id);
  }
  function handleDateUpdate() {
    const updatedListItem = {
      id: listItem.id,
      user_id: listItem.user_id,
      media_id: listItem.media_id,
      lastSeen: listItem.lastSeen,
    };
    updateListItemDate(updatedListItem);
  }
</script>

<div transition:fade class="px-4 py-2 gap-4 flex border-black border-b-2">
  <img
    class="w-1/2 shadow-md"
    src={listItem.media.poster_path}
    alt={listItem.media.title + " poster"}
  />
  <div class="w-full flex flex-col justify-center items-start h-full">
    {#if listItem.media.type === "show"}
      <Tv size={20} />
    {:else}
      <Film size={20} />
    {/if}
    <a
      class="no-underline text-slate-800 block"
      href={`/${listItem.media.type}s/${listItem.media.id}`}
    >
      <h2 class="no-underline font-bold text-black py-4">
        {listItem.media.title}
      </h2>
    </a>
    <input
      type="date"
      on:change={handleDateUpdate}
      bind:value={listItem.lastSeen}
    />
    <button class="self-end" on:click={handleDelete}>
      <Trash2
        size={35}
        class="border-none p-2 text-base inline-block relative self-end justify-self-end hover:cursor-pointer hover:bg-red-600 rounded-full hover:scale-110"
      />
    </button>
  </div>
</div>
