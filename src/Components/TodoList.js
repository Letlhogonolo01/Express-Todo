import TodoItem from "./TodoItem";
import FormAdd from "./FormAdd";
import { Button, Modal, Table } from "react-bootstrap";
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../Redux/Slice/todo";
import { Link } from "react-router-dom";

const TodoList = () => {

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.list);
  const [show, setShow] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState({});

  const handleClickRemove = (todo) => {
    setShow(true);
    setDeleteTodo(todo);
  };

  const handleRemove = () => {
    dispatch(removeTodo(deleteTodo));
    setShow(false);
  };

  return ( 
    <div className="Link">
     <Link to={'/'}>Home</Link> |
     <Link to={'/login'}>Logout</Link>
      <br/>|
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Remove todo?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete it?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRemove}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <FormAdd />
        <h1 className="title">Todo App</h1>
        <Table striped hover bordered style={{ textAlign: "center", verticalAlign: "middle" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList &&
              todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  isDone={todo.isDone}
                  createdAt={todo.createdAt}
                  updatedAt={todo.updatedAt}
                  onClickRemove={handleClickRemove}
                />
              ))}
          </tbody>
        </Table>
      
    </div>
   );
}
 
export default TodoList;