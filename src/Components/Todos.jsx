import React, { useState, useEffect } from 'react';
import img2 from './img1.webp'

function Todos() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setIndex] = useState(-1);
  const [todo, setTodo] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("todos"));
    if (x) {
      setTasks(x);
    }
  }, []);

  const deleteTodo = (index) => {
    const newTasks = tasks.filter((el, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("todos", JSON.stringify(newTasks));
  };

  const editTodo = (name, index) => {
    setTodo(name);
    setIndex(index);
  };

  const confirmUpdate = () => {
    let updatedTasks = [...tasks];
    updatedTasks.splice(editIndex, 1, { name: todo });
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    setIndex(-1);
    setTodo('');
    setShowAlert(false);
  };

  const updateTodo = () => {
    setShowAlert(true);
  };

  return (
    <div style={{backgroundImage:`url(${img2})`,height:'700px',backgroundRepeat:'no-repeat',marginLeft:'250px',borderRadius:'20%'}}>
      <ul style={{marginLeft: '10%',padding:'100px',fontSize:'30px'}}>
        {tasks.map((el, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <li style={{color:'white'}}> {el.name}</li>
              <button style={{marginLeft:'20px',fontSize:'20px',width:'100px',borderRadius:'10%',border:'none'}}  onClick={() => editTodo(el.name, index)}>Edit</button>
              <button style={{marginLeft:'20px',fontSize:'20px',width:'100px',borderRadius:'10%',border:'none'}} onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          );
        })}
      </ul>
      {editIndex !== -1 && (
        <div style={{marginLeft:'200px'}}>
          <input style={{fontSize:'30px'}}
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button style={{fontSize:'30px',borderRadius:'10%',border:'none'}} onClick={updateTodo}>Update</button>
          {showAlert && (
            <div>
              <p>Changes: {todo}</p>
              <button onClick={confirmUpdate}>Confirm Update</button>
              <button onClick={() => setShowAlert(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Todos;
