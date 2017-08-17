import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar(props) {
	return (
		<header className="nav">
			<div className="container">
				<span className="nav-toggle">
					<span/><span/><span/>
				</span>
				<div className="nav-right nav-menu">
					<NavLink className="nav-item"
							 activeClassName="is-active"
							 to="/Settings">
						<span className="icon is-small"><i className="fa fa-user"/></span> <span> Settings</span>
					</NavLink>
					<NavLink className="nav-item"
							 activeClassName="is-active"
							 to="/start">
						<span className="icon is-small"><i className="fa fa-map"/></span><span> Map</span>
					</NavLink>
					<a href="#" className="nav-item">About us</a>
				</div>
			</div>
		</header>
	)
}

export default NavBar