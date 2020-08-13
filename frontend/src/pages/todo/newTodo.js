import React, { useState, useContext } from "react";
import Api from "../../utils/api";
import { TodoActions, TodoDispatch } from "../../contexts/todoContext";
function NewTodo() {
	const todoDispatch = useContext(TodoDispatch);
	const [newTodo, setNewTodo] = useState("");

	const addTodo = () => {
		if (newTodo === "") return;
		Api.post("todo", {
			task: newTodo,
		})
			.then((resp) => {
				setNewTodo("");
				todoDispatch({
					type: TodoActions.addTodo,
					data: resp.data,
				});
			})
			.catch(() => {});
	};

	return (
		<div className='row'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addTodo();
				}}
			>
				<div className='input-group mb-3'>
					<input
						required
						className='form-control'
						placeholder='Add new todo'
						value={newTodo}
						onChange={(e) => {
							setNewTodo(e.target.value);
						}}
					/>
					<div className='input-group-append'>
						<button type='submit' className='btn btn-primary'>
							ADD
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewTodo;
