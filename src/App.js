import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import TodoList from './Components/TodoList';
import { ToastContainer } from 'react-toastify';
import React from "react";


function App() {

  return (
    <div className="App">

<ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoList/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
