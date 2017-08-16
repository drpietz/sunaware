import './SunClock.css'

import React, {Component} from 'react'


class SunClock extends Component {
	render() {
		return (
			<div className="sun-clock">
				<span className="sun-remaining">24 Minuten</span>
				<span className="sun-timer">02:22</span>
			</div>
		)
	}
}

export default SunClock