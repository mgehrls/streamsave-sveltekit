<script lang="ts">
  let innerWidth: number = 0;
  $: innerWidth = window.innerWidth;
</script>

<svelte:window bind:innerWidth />

<main class="flex w-full flex-col lg:flex-row justify-start text-white h-full">
  <div
    class="flex justify-center items-end w-full lg:w-2/3 px-4 py-20 lg:py-52 gap-4 lg:pr-12"
  >
    <img
      src="/images/streamsave_logo.png"
      alt="StreamSave Logo"
      class="w-32 lg:w-48"
    />
    <div class="flex flex-col gap-4">
      <div>
        <h1 class="text-3xl lg:text-5xl font-bold text-left">
          Fill Your <br />Show Hole<br />
          <span class="text-xl">w/ StreamSave!</span>
        </h1>
      </div>
      <a
        data-sveltekit-reload
        class="flex justify-center items-center px-6 py-2 bg-pink-700"
        target="_self"
        href="/signin">Sign in</a
      >
      <a
        data-sveltekit-reload
        class="flex justify-center items-center px-6 py-2 bg-sky-600"
        target="_self"
        href="/register">Register</a
      >
    </div>
  </div>
  <hr />
  <div
    class="w-full lg:w-1/3 flex justify-center lg:justify-start items-center lg:pl-12 py-20 lg:py-40 bg-gradient-to-l from-sky-700 to-transparent"
  >
    <p class="w-48 font-bold text-center">
      Organize your favorite shows and movies, or discover new ones!
    </p>
  </div>
</main>
<hr />
<section
  class="bg-gradient-to-tr from-pink-700 via-pink-900 to-zinc-900 w-full text-white flex flex-col justify-end items-center p-16"
>
  <div
    class="flex justify-center items-center flex-wrap gap-2 md:gap-8 lg:gap-16 py-8"
  >
    <img src="/images/BreakingBad.png" alt="" class="w-36" />
    <img src="/images/TheOffice.png" alt="" class="w-36" />
    <img src="/images/TheLastOfUs.png" alt="" class="w-36" />
    <img src="/images/Friends.png" alt="" class="w-36" />
  </div>
  <h2 class="text-2xl lg:text-5xl font-bold leading-normal">
    Your Favorite Shows & Movies
  </h2>
</section>
<hr />
<section
  class="bg-gradient-to-bl from-sky-600 via-sky-900 to-zinc-900 w-full flex justify-center items-center text-white p-4"
>
  <div class="flex flex-col justify-center items-start gap-8">
    <h2 class="text-2xl lg:text-5xl font-bold leading-normal">
      Organized How<br />You Want
    </h2>
    <a
      data-sveltekit-reload
      href="/register"
      class="transition-all hover:scale-125 hover:rounded-md px-6 py-2 bg-pink-600 text-slate-100"
      style="font-family: Outfit, sans-serif;">Start Your List!</a
    >
  </div>
  <img
    src="/images/mobile-list.png"
    alt="How the user's list looks on a mobile device"
    class="w-60 lg:w-[30rem] py-12"
  />
</section>
