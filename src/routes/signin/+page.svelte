<script>
  import GoogleBtn from "$lib/utils/GoogleBtn.svelte";
</script>

<div
  class="flex md:max-w-screen-2xl gap-8 flex-col md:flex-row justify-center items-center mt-8"
>
  <div class="md:flex flex-col p-4">
    <h1
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
      class="text-3xl text-slate-100 font-bold"
    >
      Sign In
    </h1>
    <p
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
      class="text-slate-100"
    />
  </div>

  <div
    style="height: calc(50vh);"
    class="hidden md:block w-2 rounded-md bg-white"
  />

  <div class="p-4">
    <form action="?/signin" method="POST" class="flex flex-col gap-4">
      <GoogleBtn />
    </form>
  </div>
</div>
