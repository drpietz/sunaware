import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {logout} from "../../actions/auth"

class NavBar extends Component {

	handleLogout = event => {
		event.preventDefault()
		this.props.actions.logout()
	}

	render() {
		return (
			<header className="nav">
				<div className="container">
					<span className="nav-toggle">
						<span/><span/><span/>
					</span>
					{this.props.isLoggedIn ?
						<div className="nav-right nav-menu">
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/settings">
								<span className="icon is-small"><i className="fa fa-user"/></span> <span> Settings</span>
							</NavLink>
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/start">
								<span className="icon is-small"><i className="fa fa-map"/></span><span> Map</span>
							</NavLink>
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="#"
									 onClick={this.handleLogout}>
								<span>Logout</span>
							</NavLink>
						</div>
						:
						<div className="nav-right nav-menu">
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/login">
								<span> Login</span>
							</NavLink>
							<NavLink className="nav-item"
									 activeClassName="is-active"
									 to="/signup">
								<span> Sign Up</span>
							</NavLink>
						</div>
					}
				</div>
			</header>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({logout}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)