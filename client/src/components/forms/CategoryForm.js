import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
	<form>
		<div className="form-group">
			<label>Name</label>
			<input
				type="text"
				className="form-control"
				onChange={(e) => setName(e.target.value)}
				value={name}
				autoFocus
				required
			/>
			<br />
			<button className="btn btn-outline-primary" onClick={handleSubmit}>
				Save
			</button>
		</div>
	</form>
);

export default CategoryForm;
