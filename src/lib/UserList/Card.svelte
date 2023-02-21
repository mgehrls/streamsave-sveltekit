<script lang="ts">
  import { fade } from "svelte/transition";
  import { deleteListItem, updateListItemDate } from "$lib/stores/listItems";
  import { Trash2, Tv, Film } from "lucide-svelte";
  import type { ListItemPlusMedia } from "$lib/types";
  export let listItem: ListItemPlusMedia;
  let mediaType: "Tv" | "Film";
  let showDateInput: boolean = false;

  if (listItem.media.type === "show") {
    mediaType = "Tv";
  } else {
    mediaType = "Film";
  }
  const lastSeen = new Date(listItem.lastSeen);

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

<div transition:fade class="px-2 py-4 gap-4 flex rounded-md bg-slate-700">
  <a
    class="no-underline text-slate-800 block"
    href={`/${listItem.media.type}s/${listItem.media.id}`}
  >
    <div>
      <img
        class="bg-cover h-44 max-w-none"
        src={listItem.media.poster_path}
        alt={listItem.media.title + " poster"}
      />
    </div>
  </a>
  <div class="w-full flex flex-col justify-around items-start h-44">
    <a
      class="no-underline text-slate-800 block"
      href={`/${listItem.media.type}s/${listItem.media.id}`}
    >
      {#if listItem.media.type === "show"}
        <Tv size={20} />
      {:else}
        <Film size={20} />
      {/if}
      <h2 class="no-underline font-bold text-slate-100 py-4">
        {listItem.media.title}
      </h2>
    </a>
    <div class="flex justify-between items-center w-full">
      {#if showDateInput}
        <input
          type="date"
          class="bg-slate-600 text-slate-100 w-24 text-xs"
          on:change={handleDateUpdate}
          bind:value={listItem.lastSeen}
        />
      {:else if listItem.lastSeen}
        <p
          class="text-xs text-slate-100 w-24 cursor-pointer hover:text-slate-900 hover:bg-slate-300"
          on:keypress={(e) => {
            if (e.key === "Enter") {
              showDateInput = true;
            }
          }}
          on:click={() => (showDateInput = true)}
        >
          {lastSeen.toLocaleDateString("en-US")}
        </p>
      {:else}
        <p
          on:keypress={(e) => {
            if (e.key === "Enter") {
              showDateInput = true;
            }
          }}
          on:click={() => (showDateInput = true)}
          class="text-xs text-slate-100 w-24 cursor-pointer hover:text-slate-900 hover:bg-slate-300"
        >
          last seen?
        </p>
      {/if}
      <button class="self-end" on:click={handleDelete}>
        <Trash2
          size={35}
          class="border-none p-2 text-base inline-block relative self-end justify-self-end hover:cursor-pointer hover:bg-red-600 rounded-full hover:scale-110"
        />
      </button>
    </div>
  </div>
</div>
