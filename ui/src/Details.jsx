import { useEffect } from "react";
import { useState } from "react";

export default function Details() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/inventory/${id}`)
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, []);

  return (
    <div>
      <h1>Guitar Details</h1>
      <ul>
        {details.map((item) => {
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
