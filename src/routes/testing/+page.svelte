<script lang="ts">
  import MediaRow from "$lib/components/MediaRow/MediaRow.svelte";
  import type { PageData } from "../$types";
  export let data: PageData;
  const title = "User List";
</script>

<div class="flex flex-col">
  <MediaRow page={data} {title} />
  <MediaRow
    page={data}
    title={"Trending Shows"}
    media={data.trendingShowData}
  />
  <MediaRow
    page={data}
    title={"Popular Movies"}
    media={data.popularMovieData}
  />
  <MediaRow page={data} title={"Popular Shows"} media={data.popularShowData} />
</div>
