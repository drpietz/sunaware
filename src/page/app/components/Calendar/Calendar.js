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

	componentDidMount() {
		this.ensureData()

		// always refresh current month
		this.props.actions.fetchMonth(moment().startOf('month').toDate())
	}

	componentWillReceiveProps(nextProps) {
		this.ensureData(nextProps)
	}

	ensureData = (props = this.props) => {
		if (!props.data) {
			props.actions.fetchMonth(this.getMonth(props).toDate())
		}
	}


	getMonth = (props = this.props) => {
		return moment(props.month).startOf('month')
	}

	daysInMonth = () => {
		return this.getMonth().daysInMonth()
	}

	generatePadding = (n) => {
		let result = []
		for (let i = 0; i < n; i++)
			result.push(<CalendarField className="outlier" />)
		return result
	}

	getDayOfWeek = (m) => {
		return (m.day() + 6) % 7
	}

	getStartPadding = () => {
		const length = this.getDayOfWeek(this.getMonth())
		return this.generatePadding(length)
	}

	getEndPadding = () => {
		const length = 6 - this.getDayOfWeek(this.getMonth().endOf('month'))
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

	generateRow = (rowData) => {
		return (
			<Columns>
				{ rowData.map(entry => <Column>{entry}</Column>) }
			</Columns>
		)
	}

	render() {
		const month = this.props.data ? this.getLayedOutFields() : this.getEmptyState()

		return (
			<div className="calendar">
				<div className="weekdays">
					{this.generateRow(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])}
				</div>
				{ month.map(this.generateRow) }
			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {
	const date = ownProps.month.toDate()
	let monthString = date.getUTCFullYear() + '-' + date.getMonth()
	const month = state.statistics[monthString]

	if (month) {
		return {
			data: month.data
		}
	} else {
		return {
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