import React, { useContext } from "react";
import { todoContext } from "../Context/todoContext";
import "../styles/AlertDelete.scss";

export const AlertDelete = ({ setShowAlertDelete }) => {
  const { removeTodo, todoId } = useContext(todoContext);

  return (
    <div className={"AlertContainer"}>
      <div className="alert">
        <div className="alert__content">
          <span className="material-icons-round alertWarning">
            warning_amber
          </span>
          <h3> Sure you want to delete this task ? </h3>
        </div>
        <div className="alert__buttons">
          <button
            onClick={() => {
              removeTodo(todoId);
              setShowAlertDelete(false);
            }}
            className="button buttonDelete"
          >
            Delete
          </button>
          <button
            className="button buttonCancel"
            onClick={() => {
              setShowAlertDelete(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
