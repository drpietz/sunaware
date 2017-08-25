import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {synchronizeAllowance} from "../../../../actions/uvTimer";

class AllowanceClock extends Component {

	constructor(props) {
		super(props)

		this.state = {
			text: '0 minutes'
		}
	}

	componentWillMount() {
		this.startAllowanceSyncTimer()

		if (this.props.timerIsRunning) {
			this.startUpdateTimer()
			this.updateText()
		}
	}

	componentWillReceiveProps(nextProps) {
		this.updateText(nextProps)

		if (this.props.timerIsRunning && !nextProps.timerIsRunning)
			this.stopUpdateTimer()
		else if (!this.props.timerIsRunning && nextProps.timerIsRunning) {
			this.startUpdateTimer()
		}
	}

	componentWillUnmount() {
		this.stopAllowanceSyncTimer()

		if (this.props.timerIsRunning)
			this.stopUpdateTimer()
	}

	startAllowanceSyncTimer = () => {
		this.syncronizeAllowance()
		this.syncAllowanceTimer = setInterval(this.syncronizeAllowance, 60000)
	}

	stopAllowanceSyncTimer = () => {
		clearInterval(this.syncAllowanceTimer);
	}

	startUpdateTimer = () => {
		this.timer = setInterval(this.updateText, 1000)
	}

	stopUpdateTimer = () => {
		clearInterval(this.timer)
	}

	syncronizeAllowance = () => {
		this.props.actions.synchronizeAllowance()
	}

	updateText = (props = this.props) => {
		let remaining = props.remainingAllowance
		if (props.timerIsRunning && props.allowanceSyncTime) {
			let now = new Date()
			remaining -= now.getTime() - props.allowanceSyncTime.getTime()
		}

		let minutes = Math.floor(remaining / 60000)

		let text;
		if (minutes === 1) text = "1 minute"
		else text = minutes + " minutes"

		if (text !== this.state.text)
			this.setState({text})
	}

	render() {
		return <span className={this.props.className}>{this.state.text}</span>
	}
}

function mapStateToProps(state) {
	return {
		timerIsRunning: !!state.uvTimer.timer && !state.uvTimer.timer.end,
		allowanceSyncTime: state.uvTimer.allowanceSyncTime,
		remainingAllowance: state.uvTimer.remainingAllowance
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({synchronizeAllowance}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowanceClock)
