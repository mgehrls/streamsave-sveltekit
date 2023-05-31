<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "../$types";
  export let data: PageData;

  let name: string = "";
  let email: string = "";
  let subject: string = "";
  let message: string = "";
  let isSubmitting: boolean = false;
  let submitted: boolean = false;

  const handleSubmit = async () => {
    isSubmitting = true;

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        submitted = true;
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      isSubmitting = false;
    }
  };

  onMount(() => {
    // Reset the form fields on component mount
    name = "";
    email = "";
    subject = "";
    message = "";
    if (data.session.user) {
      email = data.session.user.email;
    }
  });
</script>

{#if !submitted}
  <div
    style="background: rgb(24, 24, 27); background: linear-gradient(90deg, rgba(219, 39, 119,0.50) 0%, rgba(2, 132, 199, .7) 100%);"
    class="flex justify-center items-center h-screen overflow-hidden text-slate-100"
  >
    <div
      class="border border-white max-w-md flex flex-col gap-4 p-8 items-center justify-center mb-20 bg-zinc-900"
    >
      <h1 class="text-xl font-bold">Contact / Feedback Form</h1>
      <p class="text-slate-300 text-sm w-3/4 text-center">
        Questions / Comments / Job Offers?<br /> Send me a message!
      </p>
      <form method="post" class="flex flex-col items-start w-full gap-2">
        <div class="flex items-center justify-between w-full p-2">
          <label for="name">Name:</label>
          <input
            class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            bind:value={name}
          />
        </div>
        <div class="flex items-center justify-between w-full p-2">
          <label for="email">Email:</label>
          <input
            class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
            type="text"
            id="email"
            name="email"
            placeholder="Your email.."
            bind:value={email}
          />
        </div>
        <div class="flex items-center justify-between w-full p-2">
          <label for="subject">Subject:</label>
          <input
            class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            bind:value={subject}
          />
        </div>
        <div class="flex items-center justify-between w-full p-2">
          <label for="message">Message:</label>
          <textarea
            class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
            id="message"
            name="message"
            placeholder="Leave feedback or comment here!"
            bind:value={message}
          />
        </div>
        <button
          on:click|preventDefault={handleSubmit}
          disabled={isSubmitting}
          class="self-center mt-4 bg-blue-500 px-6 py-3"
          >{isSubmitting ? "Sending..." : "Send"}</button
        >
      </form>
    </div>
  </div>
{:else}
  <div
    style="background: rgb(24, 24, 27); background: linear-gradient(90deg, rgba(219, 39, 119,0.50) 0%, rgba(2, 132, 199, .7) 100%);"
    class="flex justify-center items-center h-screen overflow-hidden text-slate-100"
  >
    <div
      class="border border-white max-w-md flex flex-col gap-4 p-8 items-center justify-center mb-20 bg-zinc-900"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <h1 class="text-xl font-bold">Thanks for your message!</h1>
        <p class="text-slate-300 text-sm w-3/4 text-center">
          I'll get back to you as soon as I can!
        </p>
      </div>
    </div>
  </div>
{/if}
