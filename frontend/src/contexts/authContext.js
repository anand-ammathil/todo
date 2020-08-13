import React, { useReducer, useState, useEffect } from "react";

import Api from "../utils/api";

export const AuthState = React.createContext();
export const AuthDispatch = React.createContext();

const AuthActions = {
	setSession: "SET_SESSION",
	removeSession: "REMOVE_SESSION",
};

function reducer(state, action) {
	switch (action.type) {
		case AuthActions.setSession: {
			return {
				...state,
				is_logged: true,
				user_role: action.data.role,
				loading: false,
			};
		}
		case AuthActions.removeSession: {
			return {
				...state,
				is_logged: false,
				user_role: "",
				loading: false,
			};
		}
		default:
			throw new Error("Invalid Action");
	}
}
const AuthContext = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [state, dispatch] = useReducer(reducer, {
		is_logged: false,
		user_role: "",
		loading: true,
	});
	useEffect(() => {
		Api.get("auth/me")
			.then((resp) => {
				setIsLoading(false);
				dispatch({
					type: AuthActions.setSession,
					data: resp.data,
				});
			})
			.catch(() => {
				setIsLoading(false);
				dispatch({
					type: AuthActions.removeSession,
					data: {},
				});
			});
	}, [dispatch]);
	if (isLoading) {
		return <div>Loading..</div>;
	}

	return (
		<AuthState.Provider value={state}>
			<AuthDispatch.Provider value={dispatch}>
				{props.children}
			</AuthDispatch.Provider>
		</AuthState.Provider>
	);
};

export { AuthContext, AuthActions };
