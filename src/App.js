import React, { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
  { id: 3, description: "Jacket", quantity: 1, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState(""); // initial value is empty string
  const [quantity, setQuantity] = useState(1); // initial value is 1

  // Handle Description change
  function handleInputChange(e) {
    setDescription(e.target.value); // updates state with user input
  }

  // Handle Quantity change
  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value)); // updates state with user input
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(), // Unique ID based on timestamp
      description,
      quantity,
      packed: false, // Default packed status
    };

    handleAddItems(newItem); // Add the new item to the list

    // Reset the form fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <label> Quantity:</label>
      <select value={quantity} onChange={handleQuantityChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label>Description:</label>
      <input
        id="description"
        type="text"
        placeholder="Item..."
        name="description"
        value={description} // controlled input
        onChange={handleInputChange} // update state on input change
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, handleTogglePacked, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleTogglePacked={handleTogglePacked}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleTogglePacked, handleDeleteItem }) {
  return (
    <li
      style={{
        textDecoration: item.packed ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleTogglePacked(item.id)} // Toggle packed status
      />
      {item.description} ({item.quantity})

      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage}%).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems); // Initialize with the initial items

  // Function to add a new item
  function handleAddItems(newItem) {
    setItems((prevItems) => [...prevItems, newItem]); // Add the new item to the list
  }

  // Function to toggle the packed status of an item
  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Function to delete an item from the list
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
