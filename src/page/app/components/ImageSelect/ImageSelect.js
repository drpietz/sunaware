import './ImageSelect.css'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ImageSelect extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: props.defaultValue !== undefined ? props.defaultValue : null
		}
	}

	handleValueChange = value => {
		this.setState({
			value: value
		})

		this.props.onChange(value, this.props.name)
	}

	render() {
		let {name, values} = this.props;

		return (
			<div className="image-select">
				<input type="hidden" name={name} value={this.state.value} />
				{values.map(value => (
					<div value={value.value} key={value.value}
						 className={(this.state.value === value.value) ? "selected" : null}
						 onClick={() => this.handleValueChange(value.value)}>
						<img className="image" src={value.img}/>
					</div>
				))}
			</div>
		)
	}
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