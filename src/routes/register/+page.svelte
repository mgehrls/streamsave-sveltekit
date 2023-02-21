<script>
  import GoogleBtn from "$lib/GoogleBtn.svelte";
</script>

<div
  style="min-height: calc(100vh - 88px);"
  class="flex justify-center items-center h-full w-full gap-32"
>
  <div class="flex flex-col">
    <h1
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
      class="text-3xl text-slate-100 font-bold"
    >
      Register
    </h1>
    <p
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
      class="text-slate-100 my-8"
    >
      Register w/ your email or Google!
    </p>
  </div>
  <div style="height: calc(50vh);" class="w-2 rounded-md bg-white h-" />
  <div>
    <form action="?/register" method="POST" class="flex flex-col gap-4">
      <label
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-slate-100"
        for="email"
      >
        Email
      </label>
      <input type="text" name="email" />
      <label
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-slate-100"
        for="password"
      >
        Password
      </label>
      <input class="mb-4" type="password" name="password" />
      <button
        class="bg-slate-100 text-slate-800 p-2 rounded-md font-semibold hover:text-white hover:bg-orange-500"
        >Sign in</button
      >
    </form>
    <GoogleBtn />
  </div>
</div>
