import React, { useContext } from "react";

import { TodoState } from "../../contexts/todoContext";
import TodoItem from "./todoItem";
function TodoList() {
	const todoState = useContext(TodoState);
	return (
		<div className='row  justify-content-center'>
			<div className='col-md-8 col-sm-12'>
				<div className='row'>
					{todoState.todos.map((todo, index) => {
						return (
							<TodoItem
								key={todo.id}
								item={todo}
								index={index}
							></TodoItem>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default TodoList;
