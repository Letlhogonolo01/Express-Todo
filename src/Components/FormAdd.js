import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addTodo } from "../Redux/Slice/todo";

export default function FormAdd() {

    const [todo, setTodo] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTodo = {
            id: Math.floor(Math.random() * 888888) + 100000,
            name: todo,
            isDone: false,
            createdAt: (new Date().toLocaleString())
        }
        dispatch(addTodo(newTodo))
        setTodo('')
    }

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <div className="d-flex">
                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        required
                        placeholder="Enter todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="ms-2">
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </div>
        </Form>
    )
}