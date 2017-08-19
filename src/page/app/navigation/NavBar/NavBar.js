import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {logout} from "../../../../actions/auth"
import NavItem from '../NavItem/NavItem'

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
							<NavItem to="/settings" label="Settings" icon="fa-user"/>
							<NavItem to="/start" label="Start" icon="fa-map"/>
							<NavItem to="#" onClick={this.handleLogout} label="Logout" icon="fa-sign-out"/>
						</div>
						:
						<div className="nav-right nav-menu">
							<NavItem to="/login" label="Login" icon="fa-user"/>
							<NavItem to="/signup" label="Sign Up" icon="fa-user-plus"/>
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