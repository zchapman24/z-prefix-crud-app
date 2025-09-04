import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./App";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:8080/inventory/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data[0]));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  const save = () => {
    fetch(`http://localhost:8080/inventory/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, quantity: Number(item.quantity) }),
    }).then(() => setEdit(false));
  };

  const del = () => {
    if (!confirm("Delete this item?")) return;
    fetch(`http://localhost:8080/inventory/${id}`, { method: "DELETE" }).then(
      () => navigate("/myinventory")
    );
  };

  return (
    <div>
      <h1>Guitar Details</h1>

      {!edit ? (
        <>
          <p>
            <b>Item:</b> {item.item_name}
          </p>
          <p>
            <b>Description:</b> {item.description}
          </p>
          <p>
            <b>Quantity:</b> {item.quantity}
          </p>
          {isLoggedIn && (
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button onClick={del}>Delete</button>
            </>
          )}
        </>
      ) : (
        <>
          <input
            value={item.item_name}
            onChange={(event) =>
              setItem({ ...item, item_name: event.target.value })
            }
          />
          <input
            value={item.description}
            onChange={(event) =>
              setItem({ ...item, description: event.target.value })
            }
          />
          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={(event) =>
              setItem({ ...item, quantity: event.target.value })
            }
          />
          <button onClick={save}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
