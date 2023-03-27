<script lang="ts">
  export let type: "Sign In" | "Register";
</script>

<form action="?/signin&provider=google" method="POST">
  <button class="bg-slate-100 border border-solid h-8 w-full rounded-md"
    ><div class="flex justify-center items-center gap-4">
      <p class="text-slate-800 font-semibold">{type} with</p>
      <div class="flex">
        <img
          class="w-6 h-6"
          src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
          alt="Colorful Google Logo transparent clipart download @transparentpng.com"
          style={"box-shadow:none;"}
        />
      </div>
    </div>
  </button>
</form>
