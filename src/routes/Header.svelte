<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<header>
  <div class="logo">
    <a href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
  {#if data.session}
    <p>Welcome {data.session.user.email}</p>
  {:else}
    <div class="unauthedUser">
      <a href="/login" class="btn btn-primary">Login</a>
      <a href="/register" class="btn btn-secondary">Register</a>
    </div>
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.25rem;
    gap: 1rem;
    --tw-bg-opacity: 1;
    background-color: rgb(71 85 105 / var(--tw-bg-opacity));
    position: fixed;
    color: white;
    top: 0px;
    width: 100vw;
    z-index: 1000;
  }
  a {
    margin: 0;
    padding: 0;
  }
  .unauthedUser {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .logo {
    display: none;
  }
  @media (min-width: 768px) {
    .logo {
      display: block;
    }
  }
</style>
