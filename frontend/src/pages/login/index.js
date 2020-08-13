import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import { navigate, Redirect } from "@reach/router";
import { ErrorMessage } from "@hookform/error-message";

import {
	AuthDispatch,
	AuthActions,
	AuthState,
} from "../../contexts/authContext";

import Api from "../../utils/api";
import NavBar from "../../components/navbar";

function Login() {
	const authDispatch = useContext(AuthDispatch);
	const authState = useContext(AuthState);

	const { register, handleSubmit, errors, setError } = useForm();

	const onSubmit = (data) => {
		Api.post("auth/login", {
			username: data.username,
			password: data.password,
		})
			.then((resp) => {
				authDispatch({
					type: AuthActions.setSession,
					data: resp.data,
				});
				navigate("/");
			})
			.catch((err) => {
				setError("password", {
					type: "manual",
					message: err.response.data.message,
				});
			});
	};

	return authState.is_logged ? (
		<Redirect to='/' noThrow></Redirect>
	) : (
		<div>
			<NavBar
				title='Login'
				action={<Link to='/register'>Register</Link>}
			></NavBar>
			<div className='d-flex justify-content-center p-5'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='row'>
						<div className='form-group col-md-12'>
							<label>Username</label>
							<input
								className='form-control'
								name='username'
								type='text'
								ref={register({
									required: "This field is required.",
								})}
							/>
							<ErrorMessage
								errors={errors}
								name='username'
								render={({ message }) => (
									<div className='text-danger'>{message}</div>
								)}
							/>
						</div>
						<div className='form-group  col-md-12'>
							<label>Password</label>
							<input
								className='form-control'
								name='password'
								type='password'
								ref={register({
									required: "This field is required.",
								})}
							/>
							<ErrorMessage
								errors={errors}
								name='password'
								render={({ message }) => (
									<div className='text-danger'>{message}</div>
								)}
							/>
						</div>
					</div>
					<button
						className='btn btn-primary  btn-block'
						type='submit'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
