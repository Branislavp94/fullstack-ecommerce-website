import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const CouponForm = ({ handleSubmit, name, setName, discount, setDiscount, expires, setExpires }) => (
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
			<label>Discount %</label>
			<input
				type="discount"
				className="form-control"
				onChange={(e) => setDiscount(e.target.value)}
				value={discount}
				autoFocus
				required
				style={{ width: '200px' }}
			/>
			<br />
			<label>Expired Date:</label>
			<br />
			<DatePicker
				className="form-control"
				style={{ width: '200px' }}
				value={expires}
				selected={new Date()}
				onChange={(date) => setExpires(date)}
				required
			/>
			<br />
			<br />
			<button className="btn btn-outline-primary" onClick={handleSubmit}>
				Save
			</button>
		</div>
	</form>
);

export default CouponForm;
