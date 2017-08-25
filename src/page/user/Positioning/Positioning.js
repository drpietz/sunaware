import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {triggerPositionUpdate} from "../../../actions/auth"

import {notify} from 'react-notify-toast'

class Positioning extends Component {
	updatePosition = () => {
		if (this.props.positioningEnabled) {
			this.props.actions.triggerPositionUpdate()
			this.getLocation()
		}
	}

	componentWillMount() {
		this.updatePosition()
		this.setTimer(this.props.enabled)
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.errors && nextProps.errors) {
			notify.show("Please enable positioning in the browser settings", "error")
		}

		this.setTimer(nextProps.enabled)
	}

	componentWillUnmount() {
		this.stopUpdateTimer()
	}

	setTimer = enabled => {
		if (enabled)
			this.startUpdateTimer()
		else
			this.stopUpdateTimer()
	}

	startUpdateTimer = () => {
		if (this.timer === null || this.timer === undefined)
			this.timer = setInterval(this.updatePosition, 5 * 60 * 1000)
	}

	stopUpdateTimer = () => {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
	}

	render() {
		return false
	}
}


function mapStateToProps(state) {
	return {
		errors: state.auth.positioning.errors,
		enabled: state.auth.user ? state.auth.user.positioningEnabled : false
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({triggerPositionUpdate}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Positioning)
