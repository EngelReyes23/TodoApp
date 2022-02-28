import React, { useContext, useRef, useState } from "react";
import { todoContext } from "../Context/todoContext";

export const TodoItem = ({ todo, setIsVisible, setShowAlertDelete }) => {
  const {
    toggleTodo,
    setTodo,
    setIsEdit,
    colors,
    backgroundColors,
    setTodoId,
  } = useContext(todoContext);

  const liRef = useRef(null);

  const updateTodo = (argTodo) => {
    setTodo({ ...argTodo });
    setIsEdit(true);
    setIsVisible(true);
  };

  return (
    <li ref={liRef} draggable="true" className={" todoItem"}>
      <div
        className={"clickTodo"}
        onClick={() => {
          toggleTodo(todo.id);
        }}
      >
        <span className="material-icons-round todoCheckBox">
          {!todo.completed ? "radio_button_unchecked" : "task_alt"}
        </span>
        <h3 className={"todoTitle"}>{todo.title}</h3>
      </div>
      <div className={"todoContent"}>
        <p className={"todoDescription"}>{todo.description}</p>

        <div className="tags">
          <div
            className={"todoPriority"}
            style={{ backgroundColor: backgroundColors[todo.priority] }}
          >
            <span style={{ color: colors[todo.priority] }}>
              {todo.priority}
            </span>
          </div>
          <div
            className={"todoStatus"}
            style={{ backgroundColor: backgroundColors[todo.status] }}
          >
            <span style={{ color: colors[todo.status] }}>{todo.status}</span>
          </div>
        </div>

        <div className={"todoButtons"}>
          <button
            className={"button buttonEdit"}
            onClick={() => {
              updateTodo(todo);
            }}
          >
            <span className="material-icons-round">edit_note</span> Edit
          </button>
          <button
            className={"button buttonDelete"}
            onClick={() => {
              setTodoId(todo.id);
              setShowAlertDelete(true);
            }}
          >
            <span className="material-icons-round">delete_outline</span> Remove
          </button>
        </div>
      </div>
    </li>
  );
};
