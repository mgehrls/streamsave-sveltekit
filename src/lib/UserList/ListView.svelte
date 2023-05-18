<script lang="ts">
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

<div class="flex w-full">
  <h1>{listItem.media.title}</h1>
</div>
