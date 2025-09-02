import { useState } from "react";
import { useEffect } from "react";

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/inventory")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <div>
      <h1>Guitar Inventory</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.Item_Name}, {item.Description}, {item.Quantity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

{
  /* <h2>All Inventory</h2>
<ul>
  {items.map((item) => (
    <li key={item.id}>
      {item.Item_Name}, {item.Description}, {item.Quantity}
    </li>
  ))}
</ul>  */
}
