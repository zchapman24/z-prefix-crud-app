import { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Inventory from "./Inventory.jsx";
import Details from "./Details.jsx";
import GuestInventory from "./GuestInventory.jsx";

export const AppContext = createContext("");

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <>
      <AppContext.Provider
        value={{
          username,
          setUsername,
          isLoggedIn,
          setIsLoggedIn,
          userId,
          setUserId,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/myinventory" element={<Inventory userOnly />} />
            <Route path="/inventory/:id" element={<Details />} />
            <Route path="/guest" element={<GuestInventory />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
