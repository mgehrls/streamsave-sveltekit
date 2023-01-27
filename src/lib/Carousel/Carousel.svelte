<script lang="ts">
  import type { ListItemPlusMedia } from "$lib/types";

  export let images: ListItemPlusMedia[] = [];
  export let autoplay: boolean = true;
  export let numberOfImagesToScroll = 1;
  export let imageWidth: number = 300;
  let currentIndex: number = 0;
  let numberOfImagesToShow: number = 3;
  let carouselWidth: number;
  let intervalId;

  function prev() {
    currentIndex =
      (currentIndex + images.length - numberOfImagesToScroll) % images.length;
    clearInterval(intervalId);
    autoplay = false;
  }

  function next() {
    currentIndex = (currentIndex + numberOfImagesToScroll) % images.length;
    clearInterval(intervalId);
    autoplay = false;
  }

  function startAutoPlay() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + numberOfImagesToScroll) % images.length;
    }, 2000);
  }

  $: {
    if (autoplay) startAutoPlay();
    else clearInterval(intervalId);
  }
  $: {
    numberOfImagesToShow = Math.floor(carouselWidth / imageWidth);
  }
</script>

<div
  class="flex relative overflow-hidden h-80"
  style={`width: ${carouselWidth}px`}
  bind:clientWidth={carouselWidth}
>
  {#each images as image, i}
    {#if i >= currentIndex && i < currentIndex + numberOfImagesToShow}
      <div style={`width: ${imageWidth}px`}>
        <img
          alt={image.media.title + "poster"}
          class="h-full object-cover transition ease-in-out delay-500 transform"
          src={image.media.poster_path}
          style={`width: ${imageWidth}px`}
        />
      </div>
    {/if}
  {/each}
  {#if currentIndex + numberOfImagesToShow > images.length}
    {#each images.slice(0, currentIndex + numberOfImagesToShow - images.length) as image, i}
      <div style={`width: ${imageWidth}px`}>
        <img
          alt={image.media.title + "poster"}
          class="h-full object-cover transition ease-in-out delay-500 transform"
          src={image.media.poster_path}
          style={`width: ${imageWidth}px`}
        />
      </div>
    {/each}
  {/if}
  {#each images as image, i}
    {#if i >= currentIndex && i < currentIndex + numberOfImagesToShow}
      <div style={`width: ${imageWidth}px`}>
        <img
          class="h-full object-cover transition ease-in-out delay-500 transform"
          src={image.media.poster_path}
          alt={"happy?"}
        />
      </div>
    {/if}
  {/each}
  <button
    class="absolute top-1/2 transform -translate-y-1/2 text-xl cursor-pointer left-3"
    on:click={prev}
    on:blur={startAutoPlay}
    on:focus={() => clearInterval(intervalId)}
    on:mouseover={() => clearInterval(intervalId)}>&lt;</button
  >
  <button
    class="absolute top-1/2 transform -translate-y-1/2 text-xl cursor-pointer right-3 bg-white"
    on:click={next}
    on:blur={startAutoPlay}
    on:focus={() => clearInterval(intervalId)}
    on:mouseover={() => clearInterval(intervalId)}>&gt;</button
  >

  <div class="flex justify-center py-3 px-0">
    {#each images as _, i}
      <div
        class="w-3 h-3 rounded-full my-0 mx-1 bg-gray-300"
        style={currentIndex <= i && currentIndex + numberOfImagesToShow > i
          ? "background-color: #000;"
          : ""}
      />
    {/each}
  </div>
</div>
