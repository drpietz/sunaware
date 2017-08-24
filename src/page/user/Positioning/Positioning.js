import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {disablePositioning, triggerPositionUpdate} from "../../../actions/auth"


class Positioning extends Component {
	updatePosition = () => {
		if (this.props.positioningEnabled) {
			this.props.actions.triggerPositionUpdate()
			this.getLocation()
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
		enabled: state.auth.user ? state.auth.user.positioningEnabled : false
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({disablePositioning, triggerPositionUpdate}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Positioning)
