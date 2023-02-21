<script lang="ts">
  import MediaPreview from "$lib/MediaPreview/index.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<section class="flex flex-col justify-center w-full">
  <div class="relative overflow-auto overflow-y-hidden p-4">
    <MediaPreview
      userID={data.session.user.id}
      title="Trending Shows"
      media={trendingShowData}
      indexID="trendingShows"
      type="show"
    />
  </div>
  <div class="relative overflow-auto overflow-y-hidden p-4 overflow-x-hidden">
    <MediaPreview
      userID={data.session.user.id}
      title="Popular Shows"
      media={popularShowData}
      indexID="popularShows"
      type="show"
    />
  </div>
  <div class="relative overflow-auto overflow-y-hidden p-4 overflow-x-hidden">
    <MediaPreview
      userID={data.session.user.id}
      title="Popular Movies"
      media={popularMovieData}
      indexID="popularMovies"
      type="movie"
    />
  </div>
</section>
