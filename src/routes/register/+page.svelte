<div>
  <h1>Register</h1>
  <form action="?/register" method="POST" class="auth-form">
    <label for="email"> Email </label>
    <input type="text" name="email" />
    <label for="password"> Password </label>
    <input type="password" name="password" />
    <button class="btn btn-primary">Register</button>
  </form>
  <form action="?/login&provider=google" method="POST">
    <button>Google</button>
  </form>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
