<script>
    import { signIn } from "@auth/sveltekit/client";
    let email = "";
    let password = "";
    let errorMessage = "";
  
    async function handleLogin() {
      const res = await signIn("credentials", { email, password, redirect: false });
  
      if (res.error) {
        errorMessage = "Invalid credentials!";
      } else {
        window.location.href = "/dashboard"; // Redirect after login
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>Email</label>
    <input type="email" bind:value={email} required />
  
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>Password</label>
    <input type="password" bind:value={password} required />
  
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
  
    <button type="submit">Login</button>
  </form>
  