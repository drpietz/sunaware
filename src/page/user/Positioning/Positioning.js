import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {disablePositioning, updatePosition} from "../../../actions/auth";


class Positioning extends Component {

	updatePosition = () => {
		if (this.props.positioningEnabled) {
			console.log("Is enabled -> position update!")
			this.getLocation();
		}
	}

	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({coords}) => {
					this.props.actions.updatePosition(coords.latitude, coords.longitude)
				},
				() => {
					this.props.actions.disablePositioning()
				}
			);
		} else {
			this.props.actions.disablePositioning();
		}
	}

	showPosition = (position) => {
		console.log("Latitude: " + position.coords.latitude +
			"<br>Longitude: " + position.coords.longitude);
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
