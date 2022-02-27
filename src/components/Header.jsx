import React from "react";

export const Header = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <header className={"header"}>
      <h1 onClick={reload}>TodoApp</h1>

      <div className={"header__time"}>
        <div className="header__time-date">
          <span className={"material-icons-round date"}>date_range</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
};
