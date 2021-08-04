import React, { useState } from "react";

const Todo = ({ todo, onEdit, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = (e) => {
    setIsChecked(!isChecked);
  };

  const styles = {
    opacity: isChecked ? 0.5 : 1,
  };

  return (
    <li className="todoItem">
      <input
        type="checkbox"
        name={todo.id}
        onChange={onChangeHandler}
        id={todo.id}
      />
      <div className="todo-text">
        {isChecked ? <s>{todo.text}</s> : `${todo.text}`}
      </div>
      <button
        className="btn-light mr-5"
        style={styles}
        onClick={onEdit}
        disabled={isChecked}
      >
        Edit
      </button>
      <button className=" delete-btn" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
