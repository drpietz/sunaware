import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './Start.css'

class Start extends Component {

	render() {
		return (

			<div className="main">
				<div className="hero is-fullheight bg-img">
					<nav className="breadcrumb is-right is-small" aria-label="breadcrumbs">
						<ul>
							<li><Link to="/">Log out</Link></li>
							<li><a href="#">Account</a></li>
							<li><a href="#">About us</a></li>
						</ul>
					</nav>
					<div className="hero-body">
						<div className="container is-centered">
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
					</div>
				</div>
			</div>

		);
	}
}

export default Start