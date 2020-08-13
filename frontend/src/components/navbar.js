import React from "react";

function navbar({ title, action }) {
	return (
		<div className='row border bg-light'>
			<div className=' col-8 align-self-center '>
				<h1>{title}</h1>
			</div>
			<div className='col-4 align-self-center d-flex justify-content-center'>
				{action}
			</div>
		</div>
	);
}

export default navbar;
