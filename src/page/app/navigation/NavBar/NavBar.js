import './NavBar.css'

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {logout} from "../../../../actions/auth"
import NavItem from '../NavItem/NavItem'
import {Container, Navbar, NavbarBurger, NavbarEnd, NavbarMenu} from "bloomer";

class NavBar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isActive: false
		}
	}

	toggleNavbar = () => {
		this.setState({
			isActive: !this.state.isActive
		})
	}

	handleLogout = event => {
		event.preventDefault()
		this.props.actions.logout()
	}

	render() {
		return (
			<Navbar>
				<Container>
					<NavbarBurger isActive={this.state.isActive} onClick={this.toggleNavbar} />
					<NavbarMenu isActive={this.state.isActive} onClick={this.toggleNavbar} >
						{this.props.isLoggedIn ?
							<NavbarEnd>
								<NavItem to="/settings" label="Settings" icon="fa-user"/>
								<NavItem to="/stats" label="Statistics" icon="fa-line-chart"/>
								<NavItem to="/start" label="Start" disabled={!this.props.profileFilled} icon="fa-map"/>
								<NavItem to="#" onClick={this.handleLogout} label="Logout" icon="fa-sign-out"/>
							</NavbarEnd>
							:
							<NavbarEnd>
								<NavItem to="/login" label="Login" icon="fa-user"/>
								<NavItem to="/signup" label="Sign Up" icon="fa-user-plus"/>
							</NavbarEnd>
						}
					</NavbarMenu>
				</Container>
			</Navbar>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		profileFilled: state.auth.user && state.auth.user.skinType !== null && state.auth.user.position !== null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({logout}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)