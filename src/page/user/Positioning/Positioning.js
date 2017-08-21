import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {disablePositioning, updatePosition} from "../../../actions/auth";


class Positioning extends Component {
	updatePosition = () => {
		if (this.props.positioningEnabled) {
			console.log("Is enabled -> position update!")
			/*
			* this.props.actions.disablePositioning()
			* this.props.actions.updatePosition(latitude, longitude)
			*/
		}
	}

	componentWillMount() {
		this.updatePosition()
		this.timer = setInterval(this.updatePosition, 5 * 60 * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		return false
	}
}


function mapStateToProps(state) {
	return {
		positioningEnabled: state.auth.user ? state.auth.user.positioningEnabled : false
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({disablePositioning, updatePosition}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Positioning)
