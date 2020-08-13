import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { navigate, Redirect } from "@reach/router";
import { Link } from "@reach/router";
import { ErrorMessage } from "@hookform/error-message";

import { AuthState } from "../../contexts/authContext";

import Api from "../../utils/api";
import NavBar from "../../components/navbar";

function Register() {
	const authState = useContext(AuthState);

	const { register, handleSubmit, watch, setError, errors } = useForm();

	const onSubmit = (data, e) => {
		Api.post("auth/register", {
			name: data.name,
			username: data.username,
			password: data.password,
			role: data.role,
		})
			.then((resp) => {
				navigate("/login");
			})
			.catch((err) => {
				setError("username", {
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
				title='Register'
				action={<Link to='/login'>Login</Link>}
			></NavBar>
			<div className='d-flex justify-content-center p-5'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='row'>
						<div className='form-group col-md-6'>
							<label>Name</label>
							<input
								className='form-control'
								name='name'
								type='text'
								ref={register({
									required: "This field is required.",
								})}
							/>
							<ErrorMessage
								errors={errors}
								name='name'
								render={({ message }) => (
									<div className='text-danger'>{message}</div>
								)}
							/>
						</div>
						<div className='form-group col-md-6'>
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
						<div className='form-group col-md-6'>
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
						<div className='form-group col-md-6'>
							<label>Confirm Password</label>
							<input
								className='form-control'
								name='con_password'
								type='password'
								ref={register({
									required: "This field is required.",
									validate: (value) => {
										return value === watch("password")
											? true
											: "Passwords don't match";
									},
								})}
							/>
							<ErrorMessage
								errors={errors}
								name='con_password'
								render={({ message }) => (
									<div className='text-danger'>{message}</div>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name='con_password'
								render={({ messages }) =>
									messages ? (
										Object.entries(messages).map(
											([type, message]) => (
												<p
													className='text-danger'
													key={type}
												>
													{message}
												</p>
											)
										)
									) : (
										<div></div>
									)
								}
							/>
						</div>
						<div className='form-group col-md-12'>
							<label>Role</label>
							<select
								className='form-control'
								name='role'
								ref={register({
									required: "This field is required.",
								})}
							>
								<option value='regular'>REGULAR</option>
								<option value='admin'>ADMIN</option>
							</select>
							<ErrorMessage
								errors={errors}
								name='role'
								render={({ message }) => (
									<div className='text-danger'>{message}</div>
								)}
							/>
						</div>
					</div>
					<div className='row justify-content-center px-3'>
						<button
							className='btn btn-success col-md-6'
							type='submit'
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
