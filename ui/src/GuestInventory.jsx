import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./GuestInventory.css";
import { truncate100 } from "./utils/text.js";

export default function GuestInventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/inventory")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <div className="guest-inventory">
      <h1>All Guitar Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Item:</strong> {item.item_name},{" "}
            <strong>Description:</strong> {truncate100(item.description)}
            <Link className="see-details-button" to={`/inventory/${item.id}`}>
              See Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
