import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Start.css'

class Start extends Component {

	render() {
		return (
			<div className="is-centered">
				<h1 className="title">
					<strong>Sunaware</strong>
				</h1>
				<iframe
					width="1344"
					height="600"
					align="middle"
					src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB-ZrFxLXdINcrzeYrlyg6H0QXIaDhJITY
			&q=Space+Needle,Berlin">
				</iframe>
			</div>
		);
	}
}

export default Start