<script lang="ts">
  import GoogleBtn from "$lib/utils/GoogleBtn.svelte";
  import { redirect } from "@sveltejs/kit";
  export let data: import("./$types").PageData;
</script>

{#if data.session}
  {redirect(300, "/")}
{:else}
  <div
    style="background: rgb(24, 24, 27); background: linear-gradient(90deg, rgba(219, 39, 119,0.50) 0%, rgba(2, 132, 199, .7) 100%);"
    class="flex justify-center items-center h-screen overflow-hidden"
  >
    <div
      class="border border-white max-w-md flex flex-col gap-4 p-4 items-center justify-center mb-20 bg-zinc-900"
    >
      <h1 class="text-slate-100 text-2xl font-bold">Sign In</h1>
      <form action="?/signin" method="POST" class="flex flex-col gap-4">
        <label
          style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
          class="text-slate-100"
          for="email"
        >
          Email
        </label>
        <input class="bg-slate-400" type="text" name="email" />
        <label
          style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
          class="text-slate-100"
          for="password"
        >
          Password
        </label>
        <input class="bg-slate-400" type="password" name="password" />
        <button
          style="background: rgb(0, 0, 0); background: linear-gradient(90deg, rgba(2, 132, 199, 1) 0%, rgba(219, 39, 119, 1) 100%);"
          class="transition-all text-slate-100 p-2 font-semibold border border-zinc-900 hover:rounded-lg hover:border-slate-100 hover:scale-110 mt-2"
          >Login</button
        >
      </form>
      <p class="text-slate-100 text-center">
        Sign in or Register with a<br />Provider Below
      </p>
      <GoogleBtn />
    </div>
  </div>
{/if}
