import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch("http://localhost:8000/user");
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch("http://localhost:8000/user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const updateStatusAsync = createAsyncThunk(
	'todos/updateStatusAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:8000/user/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const removeTodoAsync = createAsyncThunk(
	'todos/removeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:8000/user/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);


const todoSlice = createSlice({
    name: 'todo',
    initialState:  { list: [] },
    reducers: {
        addTodo: (state, action) =>{
            state.list.push(action.payload)
        },
        removeTodo(state, action) {
            state.list = state.list.filter(todo => todo?.id !== action.payload?.id)
        },
        updateStatus(state, action) {
            const updatedAt = (new Date().toLocaleString())
            state.list = state.list.map(todo => todo.id === action.payload.id ? { ...todo, isDone: true, updatedAt } : todo)
        }
    }
})
// 
const { reducer } = todoSlice;

export const { addTodo, removeTodo, updateStatus } = todoSlice.actions;

export default reducer;