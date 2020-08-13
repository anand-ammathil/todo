import React, { useReducer } from "react";

export const TodoState = React.createContext();
export const TodoDispatch = React.createContext();

const TodoActions = {
	setTodos: "SET_TODOS",
	addTodo: "ADD_TODO",
	removeTodo: "REMOVE_TODO",
	updateTodo: "UPDATE_TODO",
};

function reducer(state, action) {
	switch (action.type) {
		case TodoActions.setTodos: {
			return {
				...state,
				todos: action.data,
			};
		}
		case TodoActions.removeTodo: {
			return {
				...state,
				todos: state.todos.filter((todo) => {
					return todo.id === action.data ? false : true;
				}),
			};
		}
		case TodoActions.addTodo: {
			state.todos.push(action.data);
			return {
				...state,
				todos: state.todos,
			};
		}
		case TodoActions.updateTodo: {
			return {
				...state,
				todos: state.todos.map((todo) => {
					return todo.id === action.data.id ? action.data : todo;
				}),
			};
		}
		default:
			throw new Error("Invalid Action");
	}
}
const TodoContext = (props) => {
	const [state, dispatch] = useReducer(reducer, { todos: [] });
	return (
		<TodoState.Provider value={state}>
			<TodoDispatch.Provider value={dispatch}>
				{props.children}
			</TodoDispatch.Provider>
		</TodoState.Provider>
	);
};

export { TodoContext, TodoActions };
