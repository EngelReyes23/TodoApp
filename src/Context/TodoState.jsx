import React, { useEffect, useReducer, useState } from "react";
import { todoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { TYPES } from "./types";

// initial state, objeto con los TODOs
const initialState = {
  todos: JSON.parse(localStorage.getItem("TODOs")) || [],
};

const backgroundColors = {
  low: "#4169e11a",
  high: "#ff00001a",
  medium: "#ffa5001a",
  pending: "#ff00001a",
  completed: "#0080001a",
  "in progress": "#4169e11a",
};

const colors = {
  low: "#4169e1",
  high: "#ff0000",
  medium: "#ffa500",
  pending: "#ff0000",
  completed: "#008000",
  "in progress": "#4169e1",
};

export const TodoState = ({ children }) => {
  // TYPES
  const {
    ADD_TODO,
    CLEAR_COMPLETED,
    COMPLETE_ALL,
    DELETE_TODO,
    EDIT_TODO,
    TOGGLE_TODO,
  } = TYPES;

  // Reducer
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  //#region STATES
  // centinela para saber si se cambia a modo edición
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState("");

  // estado con la estructura del TODO
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    status: "",
    created: "",
    priority: "",
    description: "",
    completed: false,
    lastModified: "",
  });
  //#endregion STATES

  //#region EFFECTS
  useEffect(() => {
    localStorage.setItem("TODOs", JSON.stringify(todoState.todos));
  }, [todoState.todos]);
  //#endregion EFFECTS

  //#region HANDLERS
  const addTodo = (newTodo) => {
    dispatch({
      type: ADD_TODO,
      payload: {
        ...newTodo,
        id: new Date().getTime(),
        created: new Date().toLocaleDateString(),
        completed: todo.status === "completed" ? true : false,
      },
    });
  };

  const editTodo = (todo) => {
    dispatch({
      type: EDIT_TODO,
      payload: {
        ...todo,
        completed: todo.status === "completed" ? true : false,
        lastModified: new Date().toLocaleString(),
      },
    });
  };

  const completeAll = () => {
    dispatch({
      type: COMPLETE_ALL,
    });
  };

  const clearCompleted = () => {
    dispatch({
      type: CLEAR_COMPLETED,
    });
  };

  const removeTodo = (id) => {
    dispatch({
      type: DELETE_TODO,
      payload: {
        id,
      },
    });
  };

  const toggleTodo = (id) => {
    dispatch({
      type: TOGGLE_TODO,
      payload: {
        id,
      },
    });
  };
  //#endregion HANDLERS

  return (
    <todoContext.Provider
      value={{
        // constantes
        colors,
        backgroundColors,

        // States
        isEdit,
        setIsEdit,
        setTodo,
        todo,
        todoState,
        todoId,
        setTodoId,

        // Funciones
        addTodo,
        clearCompleted,
        completeAll,
        editTodo,
        removeTodo,
        toggleTodo,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};
