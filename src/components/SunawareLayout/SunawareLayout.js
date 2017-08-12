import './SunawareLayout.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

function SunawareLayout(props) {
	return (
		<section className="welcome-page hero is-fullheight">
			<div className="hero-head">
				<header className="nav">
					<div className="container">
						<span className="nav-toggle">
							<span/>
							<span/>
						</span>
						<div className="nav-right nav-menu">
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/account">
								<span className="icon is-small"><i className="fa fa-home"/></span> <span>Account</span>
							</NavLink>
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/start">
								<span>Map</span>
							</NavLink>
							<a href="#" className="nav-item">About us</a>
						</div>
					</div>
				</header>
			</div>

			<div className="welcome-body hero-body">
				<div className="container has-text-centered">
					{props.children}
				</div>
			</div>

			<div className="welcome-foot hero-foot">
				<div className="clouds">
					<img src="/img/clouds/layer_background.svg"/>
					<img src="/img/clouds/layer_foreground.svg"/>
				</div>
				<div className="credits container has-text-centered">
					by Anne Kinstmann, Tim Pietz, Marcel Repenning, Benjamin Schmidtke
				</div>
			</div>
		</section>
	);
}

export default SunawareLayout