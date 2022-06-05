import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseOutlined, CheckOutlined, SyncOutlined,EditOutlined } from "@ant-design/icons";

import "./Home.css";

const sectionTypeTitle = {
    todo: "Todo",
    completed: "Completed",
    in_progress: "In Progress",
};

function Home() {
  const [typedInTodo, setTypedInTodo] = useState("");
  const [typedInTodoDescription,setTypedInTodoDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const user_id = localStorage.getItem("User_ID").replace(/"/g, "");

  function inProgressTodo(id){
    todos[id].status = 'in_progress';
    setTodos([...todos]);
  }
  function completeTodo(id) {
    todos[id].status = 'completed';
    setTodos([...todos]);
  }

  function editTodo(id){
    setTypedInTodo(todos[id].title);
    setTypedInTodoDescription(todos[id].description);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function AddTodo() {
    setTodos([...todos, {id:todos.length,'user_id':user_id,'title':typedInTodo.trim(),'description':typedInTodoDescription, 'status':'todo'}]);
    setTypedInTodo("");
    setTypedInTodoDescription("");
  }

  return (
    <div className="todo">
      <h1 className="title">Todo</h1>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => setTypedInTodo(event.target.value)}
      />
      <input
        type="text"
        placeholder="Add description..."
        value={typedInTodoDescription}
        onChange={(event) => setTypedInTodoDescription(event.target.value)}
      />
      <button className="add_btn" onClick={AddTodo}>Add</button>
      <div className="sectionsContainer">
        <TodoList
            sectionTitle="todo"
            inProgressTodo={inProgressTodo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            todoList={todos.filter(todo => todo.status === 'todo')}
        />
         <TodoList
          sectionTitle="in_progress"
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          todoList={todos.filter(todo => todo.status === 'in_progress')}
        />
        <TodoList
          sectionTitle="completed"
          todoList={todos.filter(todo => todo.status === 'completed')}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        /> 
      </div>
    </div>
  );
}

export default Home;

function TodoList({ sectionTitle, inProgressTodo,editTodo, completeTodo, deleteTodo, todoList }) {
  return (
    <div className="todoContainer">
      <h2
        className={
            todoList.length > 0 ? "boldSectionTitle" : "dimmedSectiontTitle"
        }
      >
        {sectionTypeTitle[sectionTitle]}
      </h2>
      <div>
        {
        todoList.map((todo,index) => (
            <div className="todoItem" key={index}>
                <span>{todo.title}</span>
                <span>{todo.description}</span>
                <div className="buttonsSection">
                    {sectionTitle === "todo" && (
                    <>
                        <button
                        className="transparent completeButton"
                        onClick={() => inProgressTodo(todo.id)}
                        >
                        <SyncOutlined className="icon" />
                        </button>
                        <button
                        className="transparent completeButton"
                        onClick={() => completeTodo(todo.id)}
                        >
                        <CheckOutlined className="icon" />
                        </button>
                    </>
                    )}
                    {sectionTitle === "in_progress" && (
                        <button
                        className="transparent completeButton"
                        onClick={() => completeTodo(todo.id)}
                        >
                        <CheckOutlined className="icon" />
                        </button>
                    )}
                    <button
                        className="transparent deleteButton"
                        onClick={() => editTodo(todo.id)}
                    >
                        <EditOutlined className="icon"/>
                    </button>
                    
                    <button
                        className="transparent deleteButton"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <CloseOutlined className="icon" />
                    </button>
                </div>
            </div> 
        ))}
      </div>
    </div>
  );
}

// TodoList.propTypes = {
//   sectionTitle: PropTypes.oneOf(["pending", "completed","todo"]).isRequired,
//   completeTodo: PropTypes.func,
//   deleteTodo: PropTypes.func,
//   todoList: PropTypes.arrayOf(PropTypes.array),
// };