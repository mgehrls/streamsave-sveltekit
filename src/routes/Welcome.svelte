<script lang="ts">
  const linkClasses =
    "text-slate-100 border-slate-200 border-solid border py-2 px-4 rounded-xl font-bold hover:text-slate-800 hover:bg-slate-100 shadow-lg";
</script>

<div
  class="h-full w-screen flex flex-col justify-center items-center"
  style="min-height: calc(100vh - 88px);"
>
  <div>
    <h1
      class="text-slate-100 text-5xl text-left font-bold my-8 tracking-wide"
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8)"
    >
      Welcome to StreamSave!
    </h1>
    <p
      class="text-slate-100 text-left mb-16 border-l-8 border-solid border-orange-500 pl-2 tracking-wide leading-relaxed"
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8)"
    >
      Create a personalized list of your favorite shows and movies and easily
      keep track <br /> of what you want to watch next. Start building your list
      now and never forget a <br /> favorite show or movie again.
    </p>
  </div>
  <div class="flex gap-8">
    <a class={linkClasses} data-sveltekit-reload href="/login">Login</a>
    <a class={linkClasses} data-sveltekit-reload href="/register"> Register </a>
  </div>
</div>
