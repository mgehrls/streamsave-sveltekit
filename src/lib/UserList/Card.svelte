<script>
  export let listItem;
  import { fade } from "svelte/transition";
  import { deleteListItem } from "$lib/stores/listItems";

  function handleDelete(id) {
    deleteListItem(id);
  }
</script>

<div transition:fade class="px-4 py-2 gap-4 flex">
  <img
    class="w-1/2 shadow-md"
    src={listItem.media.poster_path}
    alt={listItem.media.title + " poster"}
  />
  <div class="w-full flex flex-col justify-center items-center h-full">
    <a
      class="no-underline text-slate-800 block"
      href={`/${listItem.media.type}s/${listItem.media.id}`}
    >
      <h2 class="no-underline font-bold text-black">{listItem.media.title}</h2>
    </a>

    <button
      class="border-none p-2 text-base inline-block relative self-end justify-self-end"
      on:click={() => handleDelete(listItem.media.id)}>Delete</button
    >
  </div>
</div>
