import './MonthSelect.css'

import React, {Component} from 'react'
import moment from "moment";

class MonthSelect extends Component {
	constructor(props) {
		super(props)
	}

	handleMonthBackward = event => {
		event.preventDefault()
		this.props.onChange(moment(this.props.month).subtract(1, 'months'))
	}

	handleMonthForward = event => {
		event.preventDefault()
		this.props.onChange(moment(this.props.month).add(1, 'months'))
	}

	render() {
		return (
			<div className="month-select">
				<div className="left" onClick={this.handleMonthBackward}>
					&lt;
				</div>
				<div className="current">
					{this.props.month.format("MMMM YYYY")}
				</div>
				<div className="right" onClick={this.handleMonthForward}>
					&gt;
				</div>
			</div>
		)
	}
}

export default MonthSelect