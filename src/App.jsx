
import  { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    //handleSubmit function is called when the form is submitted. it prevents the page from reloading, when we change a state variable, the whole component is re-rendered. so we use the setTodos function to update the todos state variable. 
    //we use the spread operator to copy the current todos and add the new todo to the end of the array. we use the crypto.randomUUID() function to generate a random id for the new todo. 
    //we use the setNewItem function to clear the newItem input field after adding the new todo,because we want to clear the input field after adding the new todo.

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);

    setNewItem("");
  }


  function handleTodoToggle(id) {
    /* 
    >this function is called when the user clicks on the checkbox. we use the setTodos function to update the todos state variable. 
    >we use the map function to loop through the todos array and return a new array. if the todo id matches the id of the todo that was clicked, 
    >we use the spread operator to copy the todo and set the completed property to the opposite of what it was before. 
    >if the todo id does not match the id of the todo that was clicked, we return the todo as it is. */

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
            // here onChange event is used to update the value of newItem, everytime the user types something in the input field. directly setting the value of newItem to e.target.value will not work, as it is a read only property. so we use the setNewItem function to update the value of newItem. 
          />
          

        </div>
        <button className="btn">Add</button>
      </form>
      <h2>Todo List</h2>
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(todo.id)}
              />
              {todo.title}
            </label>
            <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
