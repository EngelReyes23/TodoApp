import { TYPES } from "./types";

export const todoReducer = (state = {}, action) => {
  const {
    ADD_TODO,
    CLEAR_COMPLETED,
    COMPLETE_ALL,
    DELETE_TODO,
    EDIT_TODO,
    TOGGLE_TODO,
  } = TYPES;

  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: !todo.completed,
                status: !todo.completed ? "completed" : "pending",
              }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };

    case COMPLETE_ALL:
      const areAllMarked = state.todos.every((todo) => todo.completed);
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: !areAllMarked,
        })),
      };

    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.completed === false),
      };

    default:
      return state;
  }
};
