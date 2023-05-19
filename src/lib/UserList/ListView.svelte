<script lang="ts">
  import Settings from "$lib/components/Icons/Settings.svelte";
  import { deleteListItem, updateListItemDate } from "$lib/stores/listItems";
  import type { ListItemPlusMedia } from "$lib/utils/types";
  export let listItem: ListItemPlusMedia | undefined;
  const missingPoster = "/images/posterunavailable.png";
  let showDateInput: boolean = false;

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

<div
  class="flex justify-between items-center w-full bg-slate-800 text-slate-100 p-4 text-xs sm:text-sm tracking-wide font-semibold"
>
  <p>{listItem.media.title}</p>
  <!--add <Settings /> once it does something-->
</div>
