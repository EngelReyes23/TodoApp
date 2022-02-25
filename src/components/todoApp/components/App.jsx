import React, { useEffect, useState } from "react";
import { TodoState } from "../Context/TodoState";
import { Form } from "./Form";
import { TodoList } from "./TodoList";

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // cambia el titulo de la pestaña
    document.title = "TodoApp";
  }, []);

  const reload = () => {
    window.location.reload();
  };

  return (
    <TodoState>
      <header className={"header"}>
        <h1 onClick={reload}>TodoApp</h1>
      </header>
      <main className={"container"}>
        <TodoList setIsVisible={setIsVisible} />
        {isVisible && (
          <Form isVisible={isVisible} setIsVisible={setIsVisible} />
        )}
      </main>
    </TodoState>
  );
};
