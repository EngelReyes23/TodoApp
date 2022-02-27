import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../Context/todoContext";
// Components
import { TodoItem } from "./TodoItem";
// Icons
import arrow from "./../svg/arrow.svg";
import iconAdd from "./../svg/icon-add.svg";

export const TodoList = ({ setIsVisible }) => {
  const {
    todoState: { todos },
  } = useContext(todoContext);

  //#region States
  const [todosCompleted, setTodosCompleted] = useState([]);
  const [todosPending, setTodosPending] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPending, setShowPending] = useState(true);
  //#endregion States

  useEffect(() => {
    setTodosCompleted(todos.filter((todo) => todo.completed === true) || []);
    setTodosPending(todos.filter((todo) => todo.completed === false) || []);
  }, [todos]);

  return (
    <>
      <div className={"container__title"}>
        <h1>
          You’ve got{" "}
          <span className={"taskNumber"}>{todosPending.length} task </span>
          today
        </h1>
        <button
          className={"button buttonAdd"}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <span className="material-icons-round iconAdd">add_task</span>
          Add New
        </button>
      </div>
      <div className={"container__todos"}>
        <h3
          className={"sectionTitle"}
          onClick={() => {
            setShowPending(!showPending);
          }}
        >
          <span className="material-icons-round">
            {showPending ? "expand_more" : "chevron_right"}
          </span>
          On Hold
        </h3>
        {showPending && (
          <div className={"todosPending"}>
            {todosPending.length > 0 ? (
              <ul className={"todos"}>
                {todosPending.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    setIsVisible={setIsVisible}
                  />
                ))}
              </ul>
            ) : (
              <p className={"animate__animated animate__fadeIn todosEmpty"}>
                You have no task on hold
              </p>
            )}
          </div>
        )}
        <h3
          className={"sectionTitle"}
          onClick={() => {
            setShowCompleted(!showCompleted);
          }}
        >
          <span className="material-icons-round">
            {showCompleted ? "expand_more" : "chevron_right"}
          </span>
          Completed
        </h3>
        {showCompleted && (
          <div className={"todosCompleted"}>
            {todosCompleted.length > 0 ? (
              <ul className={"todos"}>
                {/* muestra los todo completados y los ordena del mas reciente */}
                {todosCompleted
                  .sort((a, b) => {
                    return b.id - a.id;
                  })
                  .map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      setIsVisible={setIsVisible}
                    />
                  ))}
              </ul>
            ) : (
              <p className={"animate__animated animate__fadeIn todosEmpty"}>
                You have no task completed
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
