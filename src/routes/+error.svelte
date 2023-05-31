<script lang="ts">
  import { page } from "$app/stores";
  import { goto, afterNavigate } from "$app/navigation";
  import { ArrowLeft } from "lucide-svelte";
  let previousPage: string = "/";

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });
</script>

<div
  class="flex flex-col text-slate-200 justify-center items-center p-4 gap-4 relative"
>
  <button
    on:click={() => goto(previousPage)}
    class="absolute top-4 left-0 text-2xl text-slate-50 z-50"
  >
    <ArrowLeft size={45} />
  </button>
  <h1 class="font-bold text-xl mt-4">{$page.status}: {$page.error.message}</h1>

  <img src="/images/oops.gif" alt="a guy saying whoops..." />
  <p class="text-center">
    Something went wrong. If it keeps happening,<br />
    <a class="underline" href="/contact">let me know!</a>
  </p>
</div>
