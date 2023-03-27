<script lang="ts">
  const linkClasses =
    "text-slate-100 border-slate-200 border-solid border py-2 px-4 rounded font-bold hover:text-slate-800 hover:bg-slate-100 shadow-lg";
</script>

<div
  class="relative h-full w-screen flex flex-col justify-center items-center"
  style="min-height: calc(100vh - 88px);"
>
  <div
    style="border-radius: 10rem 12rem 15rem 8rem / 18rem 10rem 8rem 7rem; "
    class="absolute -left-20 top-10 h-64 w-64 bg-orange-500 opacity-75"
  />
  <div
    style="border-radius: 10rem 12rem 15rem 8rem / 18rem 10rem 8rem 7rem; "
    class="absolute right-20 bottom-10 h-64 w-64 bg-orange-500 opacity-75"
  />
  <div
    style="border-radius: 10rem 12rem 14rem 16rem / 20rem 18rem 16rem 13rem; "
    class="absolute bottom-36 h-64 w-64 bg-orange-500 opacity-75"
  />
  <div
    style="border-radius: 10rem 12rem 15rem 8rem / 18rem 10rem 8rem 7rem; "
    class="absolute -left-20 top-10 h-64 w-64 bg-orange-500 opacity-75"
  />

  <div class="px-4">
    <h1
      class="text-slate-100 text-4xl font-bold my-8 tracking-wide text-center"
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8)"
    >
      Welcome to StreamSave!
    </h1>
    <p
      class="text-slate-100 text-left mb-16 border-l-8 border-solid border-orange-500 pl-2 tracking-wide leading-relaxed"
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8)"
    >
      Create a personalized list<br />of your favorite shows and movies<br />and
      easily keep track of what you<br /> want to watch next.
    </p>
  </div>
  <div class="flex gap-8">
    <a class={linkClasses} data-sveltekit-reload href="/signin">Sign in</a>
    <a class={linkClasses} data-sveltekit-reload href="/register"> Register </a>
  </div>
</div>
