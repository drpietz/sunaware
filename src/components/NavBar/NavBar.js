import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {logout} from "../../actions/auth"
import NavItem from '../NavItem/NavItem'

class NavBar extends Component {

	handleLogout = event => {
		event.preventDefault()
		this.props.actions.logout()
	}

	render() {
		let navItems;
		if (this.props.isLoggedIn) {
			navItems = [
				{ link: {to: '/settings'}, label: 'Settings', icon: 'fa-user' },
				{ link: {to: '/start'}, label: 'Start', icon: 'fa-map' },
				{ link: {to: '#', onClick: this.handleLogout}, label: 'Logout', icon: 'fa-cog' }
			]
		} else {
			navItems = [
				{ link: {to: '/login'}, label: 'Login', icon: 'fa-user' },
				{ link: {to: '/signup'}, label: 'Sign Up', icon: 'fa-user-plus' }
			]
		}

		return (
			<header className="nav">
				<div className="container">
					<span className="nav-toggle">
						<span/><span/><span/>
					</span>
					<div className="nav-right nav-menu">
						{navItems.map(item => <NavItem {...item}/>)}
					</div>
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