<script lang="ts">
  export let data;
  let session = data;
</script>

<header>
  <div class="logo">
    <a href="/">
      <h2>StreamSave</h2>
    </a>
  </div>
  {#if !session}
    <div class="unauthedUser">
      <a href="/login" class="btn btn-primary">Login</a>
      <a href="/register" class="btn btn-secondary">Register</a>
    </div>
  {:else}
    <div class="authedUser">
      <p>Welcome {session.user.user_metadata.name.split(" ")[0]}!</p>
      <img
        class="userAvatar"
        src={session.user.user_metadata.avatar_url}
        alt="user avatar"
      />
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
    max-height: 100px;
  }
  a {
    margin: 0;
    padding: 0;
  }
  .userAvatar {
    border-radius: 50%;
    height: 50px;
  }
  .authedUser {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
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
