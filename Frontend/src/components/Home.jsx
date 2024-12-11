import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);
  const baseUri = "http://localhost:3000";
  // const baseUri = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${baseUri}/get`)
      .then((result) => setTodos(result.data))
      .catch(error => {
        if (error.isAxiosError) {
          console.error("Axios Error:", error.message);
          if (error.response) {
            console.error("Response error:", error.response.status);
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("Request was made but no response received:", error.request);
          }
        }
      })
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`${baseUri}/update/${id}`)
      .then((result) => {
        console.log(result);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch(error => {
        if (error.isAxiosError) {
          console.error("Axios Error:", error.message);
          if (error.response) {
            console.error("Response error:", error.response.status);
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("Request was made but no response received:", error.request);
          }
        }
      })
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseUri}/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch(error => {
        if (error.isAxiosError) {
          console.error("Axios Error:", error.message);
          if (error.response) {
            console.error("Response error:", error.response.status);
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("Request was made but no response received:", error.request);
          }
        }
      })
  };

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create />
      {Array.isArray(todos) && todos.length === 0 ? (
        <div>
            <h2>No Items Found</h2>
        </div>
        ) : (
        Array.isArray(todos) && todos.map((todo) => (
            <div key={todo._id} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
                ) : (
                <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
            </div>

            <div>
                <span onClick={() => handleDelete(todo._id)}>
                <BsFillTrashFill className="icon" />
                </span>
            </div>
            </div>
        ))
    )}
    </div>
  );
}

export default Home;
