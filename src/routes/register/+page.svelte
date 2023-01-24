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
        >Login</button
      >
    </form>
    <form class="mt-8" action="?/login&provider=google" method="POST">
      <button class="bg-slate-100 border border-solid py-2 px-4 rounded-md"
        ><div class="flex justify-center items-center gap-4">
          <img
            class="w-12"
            src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
            alt="Colorful Google Logo transparent clipart download @transparentpng.com"
          />
          <p class="text-xl text-slate-800 font-semibold">Login w/ Google</p>
        </div>
      </button>
    </form>
  </div>
</div>
