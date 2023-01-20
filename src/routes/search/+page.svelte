<script lang="ts">
  import type { PageData } from "./$types";
  import type { listItemPlusMedia } from "$lib/types";
  import { listItems } from "$lib/stores/listItems";
  import UserList from "$lib/UserList/UserList.svelte";
  import Result from "$lib/searchresults/Result.svelte";

  export let data: PageData;
  const results = data.results;

  let listItemsArray: listItemPlusMedia[];
  $: {
    listItemsArray = $listItems;
  }
</script>

<div class="grid grid-cols-12 pr-8" style="min-height: calc(100vh - 112px);">
  <UserList listItems={listItemsArray} />
  <section class="flex flex-col justify-center col-span-10 mr-10 mt-4">
    <p class="tracking-wide text-center my-4">
      search results for "{data.query}"...
    </p>
    <div class="w-full h-full flex flex-col justify-center items-center">
      {#each results as item}
        <Result {item} type={item.media_type} userID={data.session.user.id} />
      {/each}
    </div>
  </section>
</div>
