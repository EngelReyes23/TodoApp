import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { TodoApp } from "./Apps/TodoApp";

ReactDOM.render(
	<React.StrictMode>
		<TodoApp />
	</React.StrictMode>,
	document.getElementById("root")
);
