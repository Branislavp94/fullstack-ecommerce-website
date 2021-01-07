import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

function SearchForm() {
	const history = useHistory();
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	let dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: e.target.value }
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop`);
	};

	return (
		<div>
			<form className="form-inline" onSubmit={handleSubmit}>
				<input
					type="search"
					value={text}
					className="form-control"
					placeholder="search"
					style={{ cursor: 'pointer' }}
					onChange={handleChange}
				/>
				<SearchOutlined style={{ cursor: 'pointer' }} />
			</form>
		</div>
	);
}

export default SearchForm;
