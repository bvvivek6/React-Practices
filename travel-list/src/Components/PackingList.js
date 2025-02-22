import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onClearItems,
  onRemoveItem,
  onTogglePacked,
}) {
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
