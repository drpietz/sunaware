import './Timer.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import {synchronizeTimer, toggleTimer} from "../../../../actions/uvTimer";

import classNames from 'classnames'


class Timer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: this
		}
	}

	componentWillMount() {
		this.props.actions.synchronizeTimer()
		this.timer = setInterval(this.updateValue, 200)
		this.updateValue()
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	componentWillReceiveProps(nextProps) {
		this.updateValue(nextProps)
	}

	updateValue = (props = this.props) => {
		let value;
		if (props.isPending) {
			value = <i className="fa fa-spinner"/>
		} else if (this.timerIsObsolete(props)) {
			value = <i className="fa fa-play"/>
		} else {
			value = this.getTimerText(props)
		}

		this.setState({value})
	}

	timerIsObsolete = (props = this.props) => {
		if (!props.stopTime)
			return false

		// Obsolete if stopped more than 5s ago
		return Date.now() - props.stopTime.getTime() > 5000
	}

	getTimerText = (props = this.props) => {
		if (props.startTime) {
			let end = props.stopTime || new Date()
			let diff = Math.max(0, end - props.startTime)

			let seconds = Math.floor(diff / 1000) % 60
			let minutes = Math.floor(diff / 60000)

			return this.pad(minutes, 2) + ':' + this.pad(seconds, 2)
		} else {
			return '00:00'
		}
	}

	pad = (number, digits) => {
		if (number < 0) {
			return '-' + this.pad(-number, digits - 1)
		}

		let result = number+""
		while (result.length < digits)
			result = '0' + result

		return result;
	}


	handleTimerToggle = event => {
		this.props.actions.toggleTimer()
	}

	render() {
		return <span className={classNames("timer", this.props.className)} onClick={this.handleTimerToggle}>{this.state.value}</span>
	}
}


function mapStateToProps(state) {
	return {
		isPending: state.uvTimer.toggleState.isPending,
		errors: state.uvTimer.toggleState.errors,
		isRunning: !!state.uvTimer.timer && !state.uvTimer.timer.end,
		startTime: state.uvTimer.timer ? new Date(state.uvTimer.timer.start) : null, // TODO: Why is the start time of type string instead of date?
		stopTime: state.uvTimer.timer && state.uvTimer.timer.end ? new Date(state.uvTimer.timer.end) : null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({synchronizeTimer, toggleTimer}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer)
