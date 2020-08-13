import React, { useState, useContext } from "react";

import { AuthState } from "../../contexts/authContext";
import EditTodo from "./editTodo";

function TodoItem(props) {
	const item = props.item;
	const authState = useContext(AuthState);
	const [editEnabled, setEditEnabled] = useState(false);

	return (
		<div className='col-md-12'>
			{!editEnabled ? (
				<div className='border m-2 p-2 d-flex justify-content-between'>
					<div
						className='align-self-center d-flex px-2'
						style={{ wordBreak: " break-all" }}
					>
						{props.index + 1}. {item.task}
					</div>
					{authState.user_role === "ADMIN" && (
						<div className='align-self-center d-flex'>
							<button
								className=' btn btn-outline-secondary'
								onClick={() => {
									setEditEnabled(true);
								}}
							>
								Edit
							</button>
						</div>
					)}
				</div>
			) : (
				<EditTodo
					item={item}
					doneUpdate={() => setEditEnabled(false)}
				/>
			)}
		</div>
	);
}

export default TodoItem;
