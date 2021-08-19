import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActinos } from "../store/todoSlice";

const Todo = ({ todo, onEdit, editMode }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    if (editMode) {
      alert("In edit Mode");
      return;
    }
    setIsChecked(!isChecked);
  };

  const deleteHandler = () => {
    if (editMode) {
      alert("in edit mode");
      return;
    }
    dispatch(todoActinos.removeTodo(todo.id));
  };

  return (
    <li className="todoItem">
      <input
        type="checkbox"
        name={todo.id}
        onChange={onChangeHandler}
        id={todo.id}
        checked={isChecked}
      />
      <div className="todo-text">
        {isChecked ? <s>{todo.text}</s> : `${todo.text}`}
      </div>
      <button
        className="btn-light mr-5"
        style={{ opacity: isChecked ? 0.5 : 1 }}
        onClick={onEdit}
        disabled={isChecked}
      >
        Edit
      </button>
      <button className=" delete-btn" onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
