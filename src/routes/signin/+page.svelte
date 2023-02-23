<script>
  import GoogleBtn from "$lib/GoogleBtn.svelte";
</script>

<div
  class="flex md:max-w-screen-2xl gap-8 flex-col md:flex-row justify-center items-center mt-8 md:mt-0"
>
  <div class="md:flex flex-col p-4">
    <h1
      style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
      class="text-3xl text-slate-100 font-bold"
    >
      Sign In
    </h1>
    <p style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);" class="text-slate-100">
      Sign in w/ your email or Google!
    </p>
  </div>

  <div
    style="height: calc(50vh);"
    class="hidden md:block w-2 rounded-md bg-white"
  />

  <div class="p-4">
    <form action="?/signin" method="POST" class="flex flex-col gap-4">
      <label
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-slate-100 hidden"
        for="email"
      >
        Email
      </label>
      <input
        class="h-8 rounded pl-1"
        type="text"
        placeholder="Email"
        name="email"
      />
      <label
        style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
        class="text-slate-100 hidden"
        for="password"
      >
        Password
      </label>
      <input
        class="h-8 rounded pl-1"
        placeholder="Password"
        type="password"
        name="password"
      />
      <button
        class="h-8 bg-slate-100 text-slate-800 rounded-md font-semibold hover:text-white hover:bg-orange-500"
        >Sign In</button
      >
      <GoogleBtn type={"Sign In"} />
    </form>
  </div>
</div>
