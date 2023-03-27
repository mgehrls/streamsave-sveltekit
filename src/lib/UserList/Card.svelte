<script lang="ts">
  import { fade } from "svelte/transition";
  import { deleteListItem, updateListItemDate } from "$lib/stores/listItems";
  import { Trash2, Tv, Film } from "lucide-svelte";
  import type { ListItemPlusMedia } from "$lib/utils/types";
  export let listItem: ListItemPlusMedia | undefined;
  export let type: "show" | "movie" | undefined;
  import missingPoster from "$lib/images/posterunavailable.jpg";
  let mediaType: "Tv" | "Film";
  let showDateInput: boolean = false;
  let showConfirm: boolean = false;

  if (listItem !== undefined && listItem.media.type === "show") {
    mediaType = "Tv";
  } else {
    mediaType = "Film";
  }
  const lastSeen =
    listItem === undefined ? undefined : new Date(listItem.lastSeen);

  function handleDelete() {
    deleteListItem(listItem.media.id);
  }
  function handleDateUpdate() {
    showDateInput = false;
    const updatedListItem = {
      id: listItem.id,
      user_id: listItem.user_id,
      media_id: listItem.media_id,
      lastSeen: listItem.lastSeen,
    };
    updateListItemDate(updatedListItem);
  }
</script>

{#if listItem === undefined}
  <div transition:fade class="p-2 gap-4 flex rounded-md bg-slate-700">
    <div>
      <img
        class="bg-cover h-44 max-w-none bg-transparent"
        src={missingPoster}
        alt={"No movies in list"}
      />
    </div>
    <div class="w-full flex flex-col justify-around items-start h-44">
      {#if type === "show"}
        <Tv size={20} />
      {:else}
        <Film size={20} />
      {/if}
      <h2 class="no-underline font-bold text-slate-100 py-4">
        {`Add a ${type} to your list ->`}
      </h2>
      <div class="flex justify-between items-center w-full" />
    </div>
  </div>
{:else}
  <div transition:fade class="p-2 gap-4 flex rounded-md bg-slate-700">
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
        class="no-underline text-slate-400 block"
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
        {#if showConfirm}
          <div class="flex justify-between gap-7">
            <button
              class="text-xs cursor-pointer bg-green-600 text-white text-semibold px-2 py-1"
              on:click={() => {
                showConfirm = false;
              }}>{`Keep`}</button
            >
            <button
              class="text-xs cursor-pointer bg-red-700 text-white text-semibold px-2 py-1"
              on:keypress={(e) => {
                if (e.key === "Enter") {
                  showConfirm = false;
                  handleDelete();
                }
              }}
              on:click={() => {
                showConfirm = false;
                handleDelete();
              }}
            >
              {`Delete`}
            </button>
          </div>
        {:else if showDateInput}
          <input
            type="date"
            class="bg-slate-600 text-slate-100 w-32 text-xs"
            on:change={handleDateUpdate}
            bind:value={listItem.lastSeen}
          />
        {:else if listItem.lastSeen}
          <p
            class="text-xs text-slate-400 w-24 cursor-pointer hover:text-slate-900 hover:bg-slate-300"
            on:keypress={(e) => {
              if (e.key === "Enter") {
                showDateInput = true;
              }
            }}
            on:click={() => (showDateInput = true)}
          >
            {lastSeen.toLocaleDateString("en-US")}
          </p>
          <button
            class="text-slate-400 cursor-pointer"
            on:keypress={(e) => {
              if (e.key === "Enter") {
                showConfirm = true;
              }
            }}
            on:click={() => (showConfirm = true)}
          >
            <Trash2
              size={35}
              class="border-none p-2 text-base inline-block relative self-end justify-self-end hover:cursor-pointer hover:text-black hover:bg-red-600 rounded-full hover:scale-110"
            />
          </button>
        {:else}
          <p
            on:keypress={(e) => {
              if (e.key === "Enter") {
                showDateInput = true;
              }
            }}
            on:click={() => (showDateInput = true)}
            class="text-xs text-slate-400 w-24 cursor-pointer hover:text-slate-900 hover:bg-slate-300"
          >
            last seen?
          </p>
          <button
            class="text-slate-400 cursor-pointer"
            on:keypress={(e) => {
              if (e.key === "Enter") {
                showConfirm = true;
              }
            }}
            on:click={() => (showConfirm = true)}
          >
            <Trash2
              size={35}
              class="border-none p-2 text-base inline-block relative self-end justify-self-end hover:cursor-pointer hover:text-black hover:bg-red-600 rounded-full hover:scale-110"
            />
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
