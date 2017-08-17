import './SunClock.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {toggleTimer} from "../../actions/uvTimer"


class SunClock extends Component {

	constructor(props) {
		super(props)

		this.state = {
			timerText: '00:00'
		}
	}


	componentWillMount() {
		if (this.props.uvTimer.isRunning) {
			this.startUpdateTimer()
			this.setTimerText()
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.uvTimer.isRunning && !nextProps.uvTimer.isRunning)
			this.stopUpdateTimer()
		else if (!this.props.uvTimer.isRunning && nextProps.uvTimer.isRunning) {
			this.startUpdateTimer()
		}
	}

	componentWillUnmount() {
		if (this.props.uvTimer.isRunning)
			this.stopUpdateTimer()
	}

	startUpdateTimer = () => {
		this.timer = setInterval(this.tick, 1000)
	}

	stopUpdateTimer = () => {
		clearInterval(this.timer)
	}

	tick = () => {
		this.setTimerText()
	}

	setTimerText = () => {
		if (this.props.uvTimer.startTime) {
			let now = new Date()
			let diff = now - this.props.uvTimer.startTime

			let seconds = Math.floor(diff / 1000) % 60
			let minutes = Math.floor(diff / 60000)

			let diffText = this.pad(minutes, 2) + ':' + this.pad(seconds, 2)

			this.setState({
				timerText: diffText
			})
		} else {
			this.setState({
				timerText: '0:00'
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
		return (
			<div className="sun-clock" onClick={this.handleTimerToggle}>
				<span className="sun-remaining">24 Minuten</span>
				<span className="sun-timer">{this.state.timerText}</span>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		uvTimer: state.uvTimer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({toggleTimer}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)