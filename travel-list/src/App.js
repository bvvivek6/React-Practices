import { useState } from "react";

// const initialItems = [
//   // { id: 1, description: "Passports", quantity: 2, packed: false },
//   // { id: 2, description: "Socks", quantity: 12, packed: false },
//   // { id: 3, description: "Belt", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  //lifting state up
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
  function clearItems() {
    const confirm = window.confirm("Do you want to delete all the items?");
    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onTogglePacked={handleTogglePacked}
        onClearItems={clearItems}
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

function PackingList({ items, onClearItems, onRemoveItem, onTogglePacked }) {
  const [SortBy, setSortBy] = useState("input");

  let sortedItems;

  if (SortBy === "input") {
    sortedItems = items;
  }
  if (SortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)); //localeCompare() : Sorting by alpha order  { a.desc>b.desc }
  }
  if (SortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div>
        <select
          value={SortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="actions"
        >
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packing Order</option>
        </select>
        <button onClick={onClearItems}>Clear</button>
      </div>
    </div>
  );
}

function Item({ item, onRemoveItem, onTogglePacked }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onTogglePacked(item.id)}></input>
      <span
        style={
          item.packed ? { textDecoration: "line-through", color: "white" } : {}
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
