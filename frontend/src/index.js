import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import { AuthContext } from "./contexts/authContext";
import { TodoContext } from "./contexts/todoContext";
import ProtectedRoute from "./components/protectedRoute";

import Login from "./pages/login/index";
import Todo from "./pages/todo/index";
import Register from "./pages/register/index";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
	<React.StrictMode>
		<AuthContext>
			<TodoContext>
				<div className='container'>
					<Router>
						<Login path='/login' />
						<Register path='/register' />
						<ProtectedRoute path='/' component={Todo} />
					</Router>
				</div>
			</TodoContext>
		</AuthContext>
	</React.StrictMode>,
	document.getElementById("root")
);
