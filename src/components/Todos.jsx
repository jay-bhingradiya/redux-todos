import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {todoActinos} from '../store/todoSlice';
import Todo from './Todo';

const Todos = () => {
  const todos = useSelector (state => state.todo.todos);
  const dispatch = useDispatch ();
  const [todoList, setTodoList] = useState ([]);
  const [inputValue, setInputValue] = useState ('');
  const [editMode, setEditMode] = useState ({
    isOn: false,
    todo: {},
  });

  const submitHandler = e => {
    e.preventDefault ();

    if (inputValue === '') {
      alert ('please Enter valid value');
      return;
    }

    if (editMode.isOn) {
      dispatch (
        todoActinos.editTodo ({id: editMode.todo.id, updatedText: inputValue})
      );

      setInputValue ('');
      setEditMode ({
        isOn: false,
        todo: {},
      });
      return;
    }

    const newTodo = {
      id: Math.random (),
      text: inputValue,
    };

    dispatch (todoActinos.addTodo (newTodo));
    setInputValue ('');
  };

  const editHandler = id => {
    const getTodo = todos.find (todo => todo.id === id);
    setInputValue (getTodo.text);
    setEditMode ({
      isOn: true,
      todo: getTodo,
    });
  };

  const deleteHandler = id => {
    if (window.confirm ('Are you sure want to Delete')) {
      const remaingTodo = todoList.filter (todo => todo.id !== id);
      setTodoList (remaingTodo);
    }
  };

  const onChangeHandler = e => setInputValue (e.target.value);

  return (
    <div className="todos">
      <form onSubmit={submitHandler} className="addTodoForm" action="post">
        <input
          type="text"
          onChange={onChangeHandler}
          name="newTodo"
          id="newTodo"
          value={inputValue}
          className="form-input"
        />
        <button className="btn-light ml-4">
          {editMode.isOn ? 'Edit' : 'Add'} Todo
        </button>
      </form>

      <ul className="todoList">
        {todos.map (todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={deleteHandler.bind (null, todo.id)}
            onEdit={editHandler.bind (null, todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
