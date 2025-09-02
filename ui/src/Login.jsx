import { useState, useEffect } from "react";

export default function Login() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Zak's Guitar Inventory Management</h1>

      <h2>Login</h2>
      <form>
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>
      <form>
        <input name="first_name" placeholder="First Name" />
        <input name="last_name" placeholder="Last Name" />
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
