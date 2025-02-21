import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Belt", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
    setItems([...items, newItem]); // Add new item to the list
  }

  function handleRemoveItem(id) {
    setItems(items.filter((item) => item.id !== id)); // Remove item by id
  }

  function handleTogglePacked(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onTogglePacked={handleTogglePacked}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴Far Away 💼</h1>;
}

function Form({ onAddItem }) {
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

function PackingList({ items, onRemoveItem, onTogglePacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onTogglePacked }) {
  return (
    <li>
      <button onClick={() => onTogglePacked(item.id)}>✅</button>
      <span
        style={
          item.packed ? { textDecoration: "line-through", color: "gray" } : {}
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list, and {packedPercentage}% of
        them are packed.
      </em>
    </footer>
  );
}
