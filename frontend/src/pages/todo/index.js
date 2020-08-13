import React, { useEffect, useContext } from "react";

import { TodoActions, TodoDispatch } from "../../contexts/todoContext";
import { AuthState } from "../../contexts/authContext";

import Api from "../../utils/api";

import TodoList from "./todoList";
import NewTodo from "./newTodo";

import NavBar from "../../components/navbar";
import Logout from "./logout";

function Todo() {
	const todoDispatch = useContext(TodoDispatch);
	const authState = useContext(AuthState);
	useEffect(() => {
		Api.get("/todo")
			.then((resp) => {
				todoDispatch({
					type: TodoActions.setTodos,
					data: resp.data,
				});
			})
			.catch((err) => {});
	}, [todoDispatch]);
	return (
		<div>
			<NavBar title='Todo List' action={<Logout />} />
			<div className='d-flex justify-content-center pt-3 row'>
				{authState.user_role === "ADMIN" ? (
					<NewTodo />
				) : (
					"Login as admin to add, edit, delete todos"
				)}
			</div>
			<TodoList />
		</div>
	);
}

export default Todo;
