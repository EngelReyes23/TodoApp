import React, { useContext, useEffect, useRef, useState } from "react";
import { todoContext } from "../Context/todoContext";
// Animations
import "animate.css";

export const Form = ({ setIsVisible }) => {
  // Context
  const { addTodo, colors, editTodo, isEdit, setIsEdit, setTodo, todo } =
    useContext(todoContext);

  // States
  const [isValid, setIsValid] = useState(false);

  //#region Refs
  const titleRef = useRef();
  const formRef = useRef();
  //#endregion Refs

  //#region Effects
  useEffect(() => {
    const { title, description, priority, status } = todo;

    /* INFO: Valida si los campos cumplen con las condiciones
      y cambia el estado del botón agregar/editar */
    title.length > 3 && description.length > 3 && priority && status
      ? setIsValid(true)
      : setIsValid(false);
  }, [todo]);

  useEffect(() => {
    titleRef.current.focus();
    setIsValid(false);
  }, []);
  //#endregion Effects

  //#region Handlers
  const reset = () => {
    titleRef.current.focus();
    setIsEdit(false);
    setIsValid(false);
    setTodo({
      ...todo,
      title: "",
      status: "",
      priority: "",
      description: "",
    });
  };

  const closeForm = () => {
    formRef.current.classList.remove("animate__flipInX");
    formRef.current.classList.add("animate__flipOutX");

    // INFO: Dando un tiempo para que la animación termine
    setTimeout(() => {
      reset();

      // INFO: Dando un tiempo para que se ejecute el cambio de estado
      setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }, 700);
  };

  const handleChange = ({ target: { name, value } }) => {
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleClose = ({ target: { className } }) => {
    (className.includes("buttonCancel") ||
      className.includes("closeForm") ||
      className.includes("containerForm")) &&
      closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editTodo(todo);
      closeForm();
    } else {
      addTodo(todo);
      reset();
    }
  };
  //#endregion Handlers

  return (
    <div className="containerForm" onClick={handleClose}>
      <form
        ref={formRef}
        className={"animate__animated animate__flipInX form"}
        onSubmit={handleSubmit}
      >
        <h2 className={"form__title"}>
          {isEdit ? "Update TODO" : "New TODO"}

          <span className="material-icons-round closeForm" onClick={handleClose}>
            highlight_off
          </span>
        </h2>
        <input
          ref={titleRef}
          name={"title"}
          value={todo.title}
          className={"formInput"}
          type="text"
          placeholder={"Enter the title"}
          onChange={handleChange}
        />
        <textarea
          name={"description"}
          value={todo.description}
          className={"formInput formInputDescription"}
          type="text"
          placeholder={"Enter the description"}
          onChange={handleChange}
        />
        <select
          name={"priority"}
          className={"formInput formInputPriority"}
          onChange={handleChange}
          value={todo.priority}
          style={{ color: colors[todo.priority] }}
        >
          <option disabled={true} value="">
            Priority
          </option>
          <option className={"priorityLow"} value={"low"}>
            Low
          </option>
          <option className={"priorityMedium"} value={"medium"}>
            Medium
          </option>
          <option className={"priorityHigh"} value={"high"}>
            High
          </option>
        </select>
        <select
          name={"status"}
          className={"formInput formInputStatus"}
          onChange={handleChange}
          value={todo.status}
          style={{ color: colors[todo.status] }}
        >
          <option disabled={true} value="">
            Status
          </option>
          <option className={"statusPending"} value={"pending"}>
            Pending
          </option>
          <option className={"statusInProgress"} value={"in progress"}>
            In Progress
          </option>
          <option className={"statusCompleted"} value={"completed"}>
            Completed
          </option>
        </select>
        <button
          disabled={!isValid}
          className={`button buttonAdd ${!isValid && "buttonDisabled"}`}
          type="submit"
        >
          <span className="material-icons">
            {isEdit ? "update" : "control_point"}
          </span>
          {isEdit ? "Update" : "Add"}
        </button>
        {isEdit && (
          <button
            className={"button buttonCancel buttonAdd"}
            type="button"
            onClick={handleClose}
          >
            <span className="material-icons">not_interested</span>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};
