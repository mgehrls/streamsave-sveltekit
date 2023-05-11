<script lang="ts">
  import { listItems } from "$lib/stores/listItems";
  import type { ApiResult, ListItemPlusMedia } from "$lib/utils/types";

  export let mediaItem: ApiResult;

  let listItemsArray: ListItemPlusMedia[];
  let onList: boolean;
  let loading: boolean = false;
  let mediaTitle = mediaItem ? mediaItem.title : mediaItem.name;

  $: listItemsArray = $listItems;
  $: onList = listItemsArray
    .map((item) => item.media_id)
    .includes(mediaItem.id);
  $: if ($listItems) {
    loading = false;
  }
</script>

<a
  class="relative flex flex-col justify-start items-center m-2 w-56 rounded-lg"
  style="max-width: 14rem; min-width: 14rem;"
  href={`/${mediaItem.media_type}s/${mediaItem.id}`}
>
  <img
    draggable="false"
    class="rounded-md"
    src={`https://image.tmdb.org/t/p/w342${mediaItem.poster_path}`}
    alt={`${mediaTitle} backdrop`}
  />
</a>
