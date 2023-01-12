<script>
  export let listItem;
  import { fade } from "svelte/transition";
  import { deleteListItem } from "$lib/stores/listItems";

  function handleDelete() {
    deleteListItem(listItem.media.id);
  }
</script>

<div transition:fade class="px-4 py-2 gap-4 flex border-black border-b-2">
  <img
    class="w-1/2 shadow-md"
    src={listItem.media.poster_path}
    alt={listItem.media.title + " poster"}
  />
  <div class="w-full flex flex-col justify-center items-start h-full">
    <p class="justify-self-start self-start text-xs">{listItem.media.type}</p>
    <a
      class="no-underline text-slate-800 block"
      href={`/${listItem.media.type}s/${listItem.media.id}`}
    >
      <h2 class="no-underline font-bold text-black py-4">
        {listItem.media.title}
      </h2>
    </a>

    <button
      class="border-none p-2 text-base inline-block relative self-end justify-self-end"
      on:click={handleDelete}>Delete</button
    >
  </div>
</div>
