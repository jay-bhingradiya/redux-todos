import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {todoActinos} from '../store/todoSlice';

const Todo = ({todo, onEdit}) => {
  const [isChecked, setIsChecked] = useState (false);
  const dispatch = useDispatch ();

  const onChangeHandler = e => {
    setIsChecked (!isChecked);
  };

  const styles = {
    opacity: isChecked ? 0.5 : 1,
  };

  const deleteHandler = () => dispatch (todoActinos.removeTodo (todo.id));

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
      <button className=" delete-btn" onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
