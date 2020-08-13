import React, { useContext } from "react";

import { AuthState } from "../contexts/authContext";
import { Redirect } from "@reach/router";

const ProtectedRoute = ({ component: Component, ...props }) => {
	const authState = useContext(AuthState);
	if (authState.loading) {
		return <></>;
	}
	if (authState.is_logged === false) {
		return <Redirect noThrow to={"/login"} />;
	}

	return <Component {...props} />;
};
export default ProtectedRoute;
