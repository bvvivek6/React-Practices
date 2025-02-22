import { useState } from "react";

export default function Form({ onAddItem }) {
  const [desc, setDesc] = useState("");
  const [num, setNum] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    if (!desc) return; // Prevent empty items

    const newItem = {
      id: Date.now(),
      description: desc,
      quantity: num,
      packed: false,
    };
    onAddItem(newItem); // Call parent function to add item

    setDesc("");
    setNum(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for the trip?</h3>
      <select value={num} onChange={(e) => setNum(Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
