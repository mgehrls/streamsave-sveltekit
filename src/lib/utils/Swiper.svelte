<script lang="ts">
  import { register } from "swiper/element/bundle";
  import type { ApiResult, SbMedia } from "$lib/utils/types";
  import { onMount } from "svelte";
  import SwiperSlide from "./SwiperSlide.svelte";
  import { v4 as uuidv4 } from "uuid";

  register();

  export let media: ApiResult[] = undefined;
  export let listItemsArray: SbMedia[] = undefined;
  const swiperClasses = "h-68";
  const slideClasses = "overflow-auto w-40 h-full";
  const spaceBetween = 10;
  const basePath = "https://image.tmdb.org/t/p/w342";

  onMount(() => {
    const swiperEl = document.querySelector("swiper-container");
    const swiperParams = {
      slidesPerView: 6,
      on: {
        init() {
          // ...
        },
      },
    };

    Object.assign(swiperEl, swiperParams);
  });
</script>

<swiper-container
  class={swiperClasses}
  slides-per-view={6}
  space-between={spaceBetween}
  loop={true}
  scrollbar={true}
>
  {#if !media && !listItemsArray.length}
    <swiper-slide class={slideClasses}>No media here...</swiper-slide>
  {:else if !media && listItemsArray.length}
    {#each listItemsArray as item}
      <swiper-slide class={slideClasses}>
        <SwiperSlide {item} i={uuidv4()} />
      </swiper-slide>
    {/each}
  {:else}
    {#each media as mediaItem, i}
      <swiper-slide class={slideClasses}>
        <SwiperSlide {mediaItem} i={uuidv4()} />
      </swiper-slide>
    {/each}
  {/if}
</swiper-container>

<style>
  .swiper-scrollbar.swiper-scrollbar-horizontal {
    bottom: 0;
    height: 40px;
  }
  .swiper-scrollbar-drag {
    background: none;
  }
  .swiper-scrollbar-drag:after {
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: blue;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 0 0 0 -20px;
  }
</style>
