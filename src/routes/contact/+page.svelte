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
    <form class="flex flex-col items-start w-full gap-2">
      <div class="flex items-center justify-between w-full p-2">
        <label for="name">Name:</label>
        <input
          class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
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
        />
      </div>
      <div class="flex items-center justify-between w-full p-2">
        <label for="message">Message:</label>
        <textarea
          class="w-3/4 p-2 bg-slate-600 text-slate-100 focus:outline-none"
          id="message"
          name="message"
          placeholder="Leave feedback or comment here!"
        />
      </div>
      <button class="self-center mt-4 bg-blue-500 px-6 py-3" type="submit"
        >Send!</button
      >
    </form>
  </div>
</div>
