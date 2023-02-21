<script>
  import GoogleBtn from "$lib/GoogleBtn.svelte";
</script>

<div
  style="min-height: calc(100vh - 88px);"
  class="justify-center items-center h-full w-full gap-32"
>
  <div
    class="flex  md:max-w-screen-2xl gap-8 flex-col md:flex-row justify-center items-center"
  >
    <div class="hidden md:flex flex-col p-4">
      <h1
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-3xl text-slate-100 font-bold"
      >
        Sign In
      </h1>
      <p
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-slate-100 my-8"
      >
        Sign in w/ your email or Google!
      </p>
    </div>

    <div
      style="height: calc(50vh);"
      class="hidden md:block w-2 rounded-md bg-white"
    />

    <div class="p-4">
      <form action="?/login" method="POST" class="flex flex-col gap-4">
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
          >Sign In</button
        >
      </form>
      <GoogleBtn />
    </div>
  </div>
</div>
