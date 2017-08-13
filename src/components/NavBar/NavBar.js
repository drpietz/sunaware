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
	)
}

export default NavBar