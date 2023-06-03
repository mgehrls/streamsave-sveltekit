<script lang="ts">
  import GoogleBtn from "$lib/utils/GoogleBtn.svelte";
  import { redirect } from "@sveltejs/kit";
  export let data: import("./$types").PageData;

  let password1: string = "";
  let password2: string = "";
  let email: string = "";
  let inputClasses: string =
    password1 === password2 ? "bg-slate-400" : "bg-red-400";

  $: validEmail = isEmailProbablyValid(email);
  $: passwordsMatchAndValid =
    arePasswordsTheSame(password1, password2) &&
    arePasswordsValid(password1, password2);

  function arePasswordsTheSame(password1, password2): boolean {
    return password1 === password2;
  }

  function arePasswordsValid(password1, password2): boolean {
    return password1.length > 7 && password2.length > 7 ? true : false;
  }

  function isEmailProbablyValid(email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email);
  }
</script>

{#if data.session}
  {redirect(300, "/")}
{:else}
  <div
    style="background: rgb(24, 24, 27); background: linear-gradient(90deg, rgba(219, 39, 119,0.50) 0%, rgba(2, 132, 199, .7) 100%);"
    class="flex justify-center items-center h-screen overflow-hidden"
  >
    <div
      class="border border-white max-w-lg flex flex-col gap-4 p-8 items-center justify-center mb-20 bg-zinc-900"
    >
      <h1 class="text-slate-100 text-2xl font-bold my-4">Register</h1>
      <form action="?/register" method="POST" class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label
            style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
            class="text-slate-100"
            for="email"
          >
            Email
          </label>
          <input
            bind:value={email}
            class="bg-slate-400"
            type="text"
            name="email"
          />
          {#if email.length > 0 && !validEmail}
            <p class="text-red-400">Invalid Email</p>
          {/if}
        </div>
        <div class="flex flex-col">
          <label
            style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
            class="text-slate-100"
            for="password"
          >
            Password
          </label>
          <input
            bind:value={password1}
            class={inputClasses}
            type="password"
            name="password"
          />
        </div>
        <div class="flex flex-col">
          <label
            style="text-shadow: 2px 2px 2px rgba(0,0,0,.8);"
            class="text-slate-100"
            for="password"
          >
            Confirm Password
          </label>
          <input
            bind:value={password2}
            class={inputClasses}
            type="password"
            name="passwordConfirm"
          />
          {#if password1.length > 0 && password2.length > 0 && !passwordsMatchAndValid}
            {#if password1.length < 8}
              <p class="text-red-400 text-center">
                Password must be at least<br /> 8 characters
              </p>
            {:else}
              <p class="text-red-400 text-center">Passwords do not match</p>
            {/if}
          {/if}
        </div>
        {#if !validEmail || !passwordsMatchAndValid}
          <button
            disabled
            type="submit"
            class="bg-slate-500 transition-all text-slate-100 p-2 font-semibold border border-zinc-900 mt-2"
            >Register</button
          >
        {:else}
          <button
            disabled={!passwordsMatchAndValid || !validEmail}
            type="submit"
            style="background: rgb(0, 0, 0); background: linear-gradient(90deg, rgba(2, 132, 199, 1) 0%, rgba(219, 39, 119, 1) 100%);"
            class="transition-all text-slate-100 p-2 font-semibold border border-zinc-900 hover:rounded-lg hover:border-slate-100 hover:scale-110 mt-2"
            >Register</button
          >
        {/if}
      </form>
      <p class="text-slate-100 text-center">Or register with Google.</p>
      <GoogleBtn />
    </div>
  </div>
{/if}
