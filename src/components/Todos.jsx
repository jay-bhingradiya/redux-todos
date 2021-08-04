import React, {useState} from 'react';
import Todo from './Todo';

const todos = [
  {
    id: 1,
    text: 'Learn Redux',
    done: false,
  },
  {
    id: 2,
    text: 'Learn Web design',
    done: false,
  },
];

const Todos = () => {
  const [todoList, setTodoList] = useState (todos);
  const [inputValue, setInputValue] = useState ('');
  const [editMode, setEditMode] = useState ({
    isOn: false,
    todo: {},
  });

  const deleteHandler = id => {
    if (window.confirm ('Are you sure want to Delete')) {
      const remaingTodo = todoList.filter (todo => todo.id !== id);
      setTodoList (remaingTodo);
    }
  };
  const submitHandler = e => {
    e.preventDefault ();
    if (editMode.isOn) {
      const currentTodoIndex = todoList.findIndex (
        todo => todo.id == editMode.todo.id
      );

      todoList[currentTodoIndex].text = inputValue;

      setTodoList (todoList);
      setInputValue ('');
      setEditMode ({
        isOn: false,
        todo: {},
      });
      return;
    }
    if (inputValue === '') {
      alert ('please Enter valid value');
      return;
    }
    const newTodo = [
      {
        id: Math.random (),
        text: inputValue,
        done: false,
      },
    ];

    setTodoList ([...todoList, ...newTodo]);
    setInputValue ('');
  };

  const editHandler = id => {
    const getTodo = todoList.find (todo => todo.id === id);
    setInputValue (getTodo.text);
    setEditMode ({
      isOn: true,
      todo: getTodo,
    });
  };

  const onChangeHandler = e => {
    setInputValue (e.target.value);
  };

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
        {todoList.map (todo => (
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
