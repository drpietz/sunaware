import './Timer.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import {synchronizeTimer, toggleTimer} from "../../actions/uvTimer";


class Timer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: '00:00'
		}
	}

	componentWillMount() {
		this.props.actions.synchronizeTimer()

		if (this.props.isRunning) {
			this.startUpdateTimer()
			this.setText()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isRunning && !nextProps.isRunning)
			this.stopUpdateTimer()
		else if (!this.props.isRunning && nextProps.isRunning) {
			this.startUpdateTimer()
		}
	}

	componentWillUnmount() {
		if (this.props.isRunning)
			this.stopUpdateTimer()
	}

	startUpdateTimer = () => {
		this.timer = setInterval(this.tick, 1000)
	}

	stopUpdateTimer = () => {
		clearInterval(this.timer)
	}

	tick = () => {
		this.setText()
	}

	setText = () => {
		if (this.props.startTime) {
			let now = new Date()
			let diff = now - this.props.startTime

			let seconds = Math.floor(diff / 1000) % 60
			let minutes = Math.floor(diff / 60000)

			let diffText = this.pad(minutes, 2) + ':' + this.pad(seconds, 2)

			this.setState({
				text: diffText
			})
		} else {
			this.setState({
				text: '00:00'
			})
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
		return <span className="timer" onClick={this.handleTimerToggle}>{this.state.text}</span>
	}
}


function mapStateToProps(state) {
	return {
		isRunning: !!state.uvTimer.timer && !state.uvTimer.timer.end,
		startTime: state.uvTimer.timer ? new Date(state.uvTimer.timer.start) : null // TODO: Why is the start time of type string instead of date?
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({synchronizeTimer, toggleTimer}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer)
