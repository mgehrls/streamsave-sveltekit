<script lang="ts">
  import MoviePreview from "$lib/MoviePreview/index.svelte";
  import ShowPreview from "$lib/ShowPreview/index.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { popularMovieData, popularShowData, trendingShowData } = data;
</script>

<section class="flex flex-col justify-center w-full">
  <div class="relative overflow-auto overflow-y-hidden p-4">
    <ShowPreview
      userID={data.session.user.id}
      title="Trending Shows"
      shows={trendingShowData}
    />
  </div>
  <div class="relative overflow-auto overflow-y-hidden p-4 overflow-x-hidden">
    <ShowPreview
      userID={data.session.user.id}
      title="Popular Shows"
      shows={popularShowData}
    />
  </div>
  <div class="relative overflow-auto overflow-y-hidden p-4 overflow-x-hidden">
    <MoviePreview
      userID={data.session.user.id}
      title="Popular Movies"
      movies={popularMovieData}
    />
  </div>
</section>
