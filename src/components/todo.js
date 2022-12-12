import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [itemsList, setItemsList] = useState([]);

  function handleChangeInput(event) {
    const inputTask = event.target.value;

    setTask(inputTask);
  }

  function handleAddItemToList(event) {
    event.preventDefault();

    if (!task) {
      return;
    }

    setItemsList([...itemsList, task]);
    setTask("");
  }

  return (
    <div className="todo">
      <form onSubmit={handleAddItemToList}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          onChange={handleChangeInput}
          value={task}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="todo-list ">
        {itemsList.map((item, index) => (
          <li key={index}>
            <div className="valor-adicionado metas">
              <input type="checkbox" name="tarefa" id="meta1" />
              <label htmlFor="meta1">{item}</label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
