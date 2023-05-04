<script lang="ts">
  import MediaPreview from "$lib/components/MediaPreview/index.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<div>
  <MediaPreview
    userID={data.session.user.id}
    title="Trending Shows"
    media={trendingShowData}
    indexID="trendingShows"
    type="show"
  />
  <MediaPreview
    userID={data.session.user.id}
    title="Popular Shows"
    media={popularShowData}
    indexID="popularShows"
    type="show"
  />
  <MediaPreview
    userID={data.session.user.id}
    title="Popular Movies"
    media={popularMovieData}
    indexID="popularMovies"
    type="movie"
  />
</div>
