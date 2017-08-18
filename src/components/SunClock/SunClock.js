import './SunClock.css'

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {toggleTimer} from "../../actions/uvTimer"

import Timer from '../Timer/Timer'


class SunClock extends Component {
	render() {
		return (
			<div className="sun-clock">
				<span className="sun-remaining">24 Minuten</span>
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