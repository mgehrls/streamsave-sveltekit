<script lang="ts">
  import type { PageData } from "./$types";
  import UserList from "$lib/UserList/UserList.svelte";
  export let data: PageData;
</script>

<div class="w-full max-w-7xl mt-16">
  <div class="p-4">
    <UserList listItems={data.listItems.data} />
  </div>
</div>
