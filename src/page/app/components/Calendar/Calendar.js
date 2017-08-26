import './Calendar.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchMonth} from "../../../../actions/statistics";
import moment from "moment";
import CalendarField from "../CalendarField/CalendarField";
import {Column, Columns} from "bloomer";
import random from 'random-seed'

class Calendar extends Component {
	getMonth = () => {
		return moment(this.props.month).startOf('month')
	}

	daysInMonth = () => {
		return this.getMonth().daysInMonth()
	}

	generatePadding = (n) => {
		let result = []
		for (let i = 0; i < n; i++)
			result.push(<CalendarField/>)
		return result
	}

	getStartPadding = () => {
		const length = this.getMonth().day() - 1
		return this.generatePadding(length)
	}

	getEndPadding = () => {
		const length = 7 - this.getMonth().endOf('month').day()
		return this.generatePadding(length)
	}

	getDataFields = (data = this.props.data) => {
		let result = []
		data.forEach((value, index) => {
			result.push(<CalendarField value={value} date={index + 1} />)
		});
		return result
	}

	getFields = (data = this.props.data) => {
		return [
			...this.getStartPadding(),
			...this.getDataFields(data),
			...this.getEndPadding()
		]
	}

	getLayedOutFields = (data = this.props.data) => {
		const fields = this.getFields(data)

		let result = []
		for (let offset = 0; offset < fields.length; offset += 7) {
			result.push(fields.slice(offset, offset+7))
		}

		return result
	}

	getEmptyState = () => {
		const data = this.getRandomCloudEmojis(this.daysInMonth())
		return this.getLayedOutFields(data)
	}

	getRandomCloudEmojis = (n) => {
		const rnd = random(this.props.month)
		let result = []
		for (let i = 0; i < n; i++) {
			result.push(<img className="emoji" src={"/img/noto/" + rnd.intBetween(0, 4) + ".svg"}/>)
		}
		return result
	}

	render() {
		const month = this.props.data ? this.getLayedOutFields() : this.getEmptyState()
		console.log(this.getRandomCloudEmojis(this.daysInMonth()))

		return (
			<div className="calendar">
				{ month.map(week => (
					<Columns>
						{ week.map(day => <Column>{day}</Column>) }
					</Columns>
				)) }
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {
	const month = state.statistics[ownProps.month]

	if (month) {
		return {
			isPending: month.isPending,
			errors: month.errors,
			data: month.data
		}
	} else {
		return {
			isPending: false,
			errors: null,
			data: null
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({fetchMonth}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)