import React, { useEffect, useState } from "react";
import { TodoState } from "../Context/TodoState";
import { Form } from "./Form";
import { Header } from "./Header";
import { TodoList } from "./TodoList";
import { AlertDelete } from "./AlertDelete";

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);

  return (
    <TodoState>
      <Header />
      <main className={"container"}>
        <TodoList
          setIsVisible={setIsVisible}
          setShowAlertDelete={setShowAlertDelete}
        />
        {isVisible && (
          <Form isVisible={isVisible} setIsVisible={setIsVisible} />
        )}
        {showAlertDelete && (
          <AlertDelete setShowAlertDelete={setShowAlertDelete} />
        )}
      </main>
    </TodoState>
  );
};
