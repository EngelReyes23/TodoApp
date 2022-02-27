import React, { useEffect, useState } from "react";
import { TodoState } from "../Context/TodoState";
import { Form } from "./Form";
import { Header } from "./Header";
import { TodoList } from "./TodoList";

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TodoState>
      <Header />
      <main className={"container"}>
        <TodoList setIsVisible={setIsVisible} />
        {isVisible && (
          <Form isVisible={isVisible} setIsVisible={setIsVisible} />
        )}
      </main>
    </TodoState>
  );
};
