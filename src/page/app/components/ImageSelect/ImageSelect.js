import './ImageSelect.css'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class ImageSelect extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: props.defaultValue !== undefined ? props.defaultValue : null
		}
	}

	handleValueChange = value => {
		if (this.props.isFixed)
			return;

		this.setState({
			value: value
		})

		this.props.onChange(value, this.props.name)
	}

	render() {
		return (
			<div className={classNames("image-select", { "fixed": this.props.isFixed })} >
				<input type="hidden"
					   name={this.props.name} value={this.state.value}/>
				{this.props.values.map(value => (
					<div value={value.value} key={value.value}
						 className={classNames({"selected": this.state.value === value.value})}
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
	]),
	isFixed: PropTypes.bool
}


export default ImageSelect