import React, { useState, useContext } from "react";
import Api from "../../utils/api";

import { TodoActions, TodoDispatch } from "../../contexts/todoContext";

function TodoItem({ item, doneUpdate }) {
	const todoDispatch = useContext(TodoDispatch);
	const [newTask, setNewTask] = useState(item.task);

	const updateItem = () => {
		if (newTask === "") return;
		Api.put("todo/" + item.id, {
			task: newTask,
		})
			.then((resp) => {
				doneUpdate();
				todoDispatch({
					type: TodoActions.updateTodo,
					data: resp.data,
				});
			})
			.catch((e) => {});
	};

	const deleteItem = () => {
		Api.delete("todo/" + item.id)
			.then((resp) => {
				todoDispatch({
					type: TodoActions.removeTodo,
					data: item.id,
				});
			})
			.catch(() => {});
	};

	return (
		<div className='row border m-2 p-2'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateItem();
				}}
			>
				<div className='col-md-12 input-group'>
					<input
						required
						className='form-control'
						placeholder='Enter todo'
						onChange={(e) => {
							setNewTask(e.target.value);
						}}
						defaultValue={newTask}
					/>
					<div className='input-group-append'>
						<button
							type='submit'
							className='btn btn-outline-secondary'
							onClick={() => updateItem()}
						>
							Update
						</button>
						<button
							className='btn btn-outline-secondary'
							onClick={(e) => {
								e.preventDefault();
								deleteItem();
							}}
						>
							Delete
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TodoItem;
