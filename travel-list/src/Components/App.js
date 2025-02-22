import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

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
