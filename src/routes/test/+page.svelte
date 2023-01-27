<script lang="ts">
  import Carousel from "$lib/Carousel/Carousel.svelte";
  import { listItems } from "$lib/stores/listItems";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<Carousel images={data.listItems.data} />
