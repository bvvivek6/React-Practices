export default function Item({ item, onRemoveItem, onTogglePacked }) {
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
