import './ImageSelect.css'
import React from 'react'
import PropTypes from 'prop-types'

function ImageSelect({name, values, defaultValue}) {
	return (
		<div className="image-select">
			{values.map(value => (
				<label className="rad" key={value.value}>
					<input type="radio" name={name} value={value.value} defaultChecked={value.value === defaultValue}/>
					<div>
						<img className="image" src={value.img}/>
					</div>
				</label>
			))}
		</div>
	)
}

ImageSelect.propTypes = {
	name: PropTypes.string.isRequired,
	values: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			]).isRequired,
			img: PropTypes.string.isRequired
		})
	).isRequired,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
}


export default ImageSelect