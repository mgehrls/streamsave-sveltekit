<script>
  import LayoutWrapper from "../../utils/LayoutWrapper.svelte";
</script>

<div
  class="flex w-full flex-col lg:flex-row justify-start text-white h-full mb-2"
>
  <div
    class="flex justify-center items-center w-full lg:w-1/2 px-4 py-20 lg:py-52 gap-4 lg:pr-12"
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
        </h1>
        <h3 class="text-xl">w/ StreamSave!</h3>
      </div>
      <a
        data-sveltekit-reload
        class="flex justify-center items-center px-6 py-2 bg-pink-600"
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
  <div
    style="background: rgb(24, 24, 27); background: linear-gradient(90deg, rgba(219, 39, 119,0.50) 0%, rgba(2, 132, 199, .7) 100%);"
    class="w-full lg:w-1/2 flex justify-center lg:justify-start items-center lg:pl-12 py-20 lg:py-40"
  >
    <p class="w-48 font-bold text-center">
      Organize your favorite shows and movies, or discover new ones!
    </p>
  </div>
</div>
<div
  style="background-image:linear-gradient(to top right, rgba(), rgba(0,0,0,0)), url(/static/images/wavypattern.png);"
  class="h-60"
/>
