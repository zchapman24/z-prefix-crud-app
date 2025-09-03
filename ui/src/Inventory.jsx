import { useState, useEffect, useContext } from "react";
import { AppContext } from "./App";
import { Link } from "react-router-dom";
import { truncate100 } from "./utils/text.js";

export default function Inventory({ userOnly = false }) {
  const [items, setItems] = useState([]);
  const { userId } = useContext(AppContext);
  const [newInventory, setNewInventory] = useState({
    item_name: "",
    description: "",
    quantity: "",
  });
  useEffect(() => {
    const url =
      userOnly && userId
        ? `http://localhost:8080/myinventory/${userId}`
        : `http://localhost:8080/inventory`;

    if (userOnly && !userId) return;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, [userOnly, userId]);

  function addInventory(event) {
    event.preventDefault();
    if (!userId) {
      alert("Please log in again");
      return;
    }
    if (
      !newInventory.item_name ||
      !newInventory.description ||
      !newInventory.quantity
    )
      return alert("Enter everything!");

    fetch("http://localhost:8080/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newInventory,
        quantity: Number(newInventory.quantity),
        userid: userId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        const url = userOnly
          ? `http://localhost:8080/myinventory/${userId}`
          : `http://localhost:8080/inventory`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => setItems(data));
        setNewInventory({ item_name: "", description: "", quantity: "" });
      });
  }

  return (
    <div>
      <h1>{userOnly ? "My Guitar Inventory" : "All Guitar Inventory"}</h1>
      {userOnly && userId && (
        <>
          <h2>Add Item</h2>
          <form onSubmit={addInventory}>
            <input
              placeholder="Name"
              value={newInventory.item_name}
              onChange={(event) =>
                setNewInventory({
                  ...newInventory,
                  item_name: event.target.value,
                })
              }
            />
            <input
              placeholder="Description"
              value={newInventory.description}
              onChange={(event) =>
                setNewInventory({
                  ...newInventory,
                  description: event.target.value,
                })
              }
            />
            <input
              placeholder="Quantity"
              type="number"
              value={newInventory.quantity}
              onChange={(event) =>
                setNewInventory({
                  ...newInventory,
                  quantity: event.target.value,
                })
              }
            />
            <button type="submit">Add</button>
          </form>
        </>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Item:</strong> {item.item_name},{" "}
            <strong>Description:</strong> {truncate100(item.description)}{" "}
            <strong>Quantity:</strong> {item.quantity}{" "}
            {item.id && (
              <Link className="see-details-button" to={`/inventory/${item.id}`}>
                See Details
              </Link>
            )}
          </li>
        ))}
      </ul>
      {userOnly && <Link to="/inventory">Go to All Inventory</Link>}
    </div>
  );
}
