import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "./App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const { setIsLoggedIn, setUsername, setUserId } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); //idk if i need this or not
    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        setIsLoggedIn(true);
        setUsername(data.username);
        setUserId(data.id);
        navigate("/myinventory");
      } else {
        alert(
          "Incorrect login! Either your username and/or password is incorrect."
        );
      }
    } catch (err) {
      console.error(err);
      alert("You are not connected to the server!");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        alert(`Inventory Manager account created for ${data.username}!`);
        setNewUser({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
        });
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("You are not connected to the server!");
    }
  };

  return (
    <div>
      <h1>Zak's Guitar Inventory Management</h1>

      <h2>Login</h2>
      <form className="form-1" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(error) => setPassword(error.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>

      <h2>Register</h2>
      <form className="form-2" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(event) =>
            setNewUser({ ...newUser, first_name: event.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(event) =>
            setNewUser({ ...newUser, last_name: event.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(event) =>
            setNewUser({ ...newUser, username: event.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/guest">
        <p>Continue as Guest</p>
      </Link>
    </div>
  );
}
