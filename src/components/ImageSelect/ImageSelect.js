import './ImageSelect.css'
import React from 'react'
import PropTypes from 'prop-types'

function ImageSelect({name, values}) {
	return (
		<div>
			{values.map(value => (
				<label className="rad">
					<input type="radio" name={name} value={value.value} />
					<img src={value.img}/>
				</label>
			))}
		</div>
	)
}

ImageSelect.propTypes = {
	name: PropTypes.string.isRequired,
	values: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			img: PropTypes.string.isRequired
		})
	).isRequired
}


export default ImageSelect