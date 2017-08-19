import './SunClock.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {toggleTimer} from "../../../actions/uvTimer"

import Timer from './Timer/Timer'
import AllowanceClock from './AllowanceClock/AllowanceClock'


class SunClock extends Component {
	render() {
		return (
			<div className="sun-clock">
				<AllowanceClock className="sun-remaining"/>
				<Timer/>
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