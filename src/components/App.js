import React, { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 5, packed: false },
  { id: 3, description: "Charger set", quantity: 1, packed: false },
  { id: 4, description: "Pyjamas", quantity: 4, packed: false },
  {id: 5, description: "Shoes", quantity: 2, packed: false},
  {id:6, description: "Slippers", quantity: 1, packed: false},
  {id:7, description: "Sunscreen", quantity: 1, packed: false},
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

    if (!description.trim()) return; // Prevent empty items

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

// function Item({ item, handleTogglePacked, handleDeleteItem }) {
//   return (
//     <li
//       onClick={() => handleTogglePacked(item.id)} // Toggle packed on click
//       style={{
//         textDecoration: item.packed ? "line-through" : "none",
//         cursor: "pointer", // Make it visually clear that it's clickable
//       }}
//     >
//       {item.description} ({item.quantity})
//       <button onClick={(e) => {
//         e.stopPropagation(); // Prevent marking packed when deleting
//         handleDeleteItem(item.id);
//       }}>Delete</button>
//     </li>
//   );
// }

function Item({ item, handleTogglePacked, handleDeleteItem }) {
  return (
    <li
      style={{
        cursor: "pointer", // Make the list item visually clickable
      }}
    >
      <span
        onClick={() => handleTogglePacked(item.id)} // Toggle packed on click
        style={{
          textDecoration: item.packed ? "line-through" : "none", // Apply strike-through only to this span
        }}
      >
        {item.description} ({item.quantity})
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent marking packed when deleting
          handleDeleteItem(item.id); // Call delete handler
        }}
        style={{
          color: "gold",
          fontSize: "25px", // Corrected to include 'px'
          marginLeft: "10px", // Space between text and delete button
          cursor: "pointer", // Indicate that the button is clickable
        }}
      >
        ✘
      </button>
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
