import React, { useContext } from "react";

import { AuthDispatch, AuthActions } from "../../contexts/authContext";

import Api from "../../utils/api";
function Logout() {
	const authDispatch = useContext(AuthDispatch);
	const logout = () => {
		Api.post("auth/logout")
			.then((resp) => {
				authDispatch({
					type: AuthActions.removeSession,
					data: resp.data,
				});
			})
			.catch(() => {});
	};
	return (
		<div>
			<button className='btn  btn-dark' onClick={() => logout()}>
				Logout
			</button>
		</div>
	);
}

export default Logout;
