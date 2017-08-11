import './Account.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { login, register, logout} from '../../actions/auth'

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: null,
			password: null,
			displayname: null,
			gps: true,
			skinType: null
		}
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}


	handleLogin = (event) => {
		event.preventDefault()
		this.props.actions.login(this.state.username, this.state.password)
	}

	handleRegister = (event) => {
		event.preventDefault()
		this.props.actions.register(this.state.username, this.state.password, this.state.displayname)
	}

	handleLogout = (event) => {
		this.props.actions.logout()
	}


	render() {
		return (
			<div className='account'>
				{ this.props.auth.isLoggedIn ? (
					<div className="column">
						Welcome, { this.props.user.displayname }
						<br/><br/>
						<form onChange={this.handleInputChange}>
							<p className="field">
							<label className="label">Skin type</label>
							<a className="control">
								<a className="select" name="skinType">
									<select>
										<option>weiß</option>
										<option>hell</option>
										<option>medium</option>
										<option>mediterran</option>
										<option>braun</option>
										<option>schwarz</option>
									</select>
								</a>
							</a>
						</p>
						<p className="field">
							<a className="checkbox"> </a>
							<label className="checkbox">
								<input type="checkbox" name="gps" /> GPS enabled
							</label>
						</p>
						<div className="field">
							<label className="label">Longitude</label>
								<input className="input" name="longitude" type="text" placeholder="Longitude input"/>
							</div>


						<div className="field">
							<label className="label">Latitude</label>
								<input className="input" name="latitude" type="text" placeholder="Latitude input"/>
						</div>
						</form>
						<br/>
						<p className="field">
							<button className="button is-warning" onClick={this.handleLogout}>Logout</button>
						</p>
					</div>
				) : (
					<div className="hero is-fullheight bg-img">
						<nav className="breadcrumb is-right is-small" aria-label="breadcrumbs">
							<ul>
								<li><Link to="/account">Login</Link></li>
								<li><Link to="/start">Sign up</Link></li>
								<li><a href="#">About us</a></li>
							</ul>
						</nav>
						<form onChange={this.handleInputChange}>
							<div className="field">
								<label className="label">Name</label>
								<div className="control has-icons-left has-icons-right">
									<input className="input" name="displayname" type="text" placeholder="Name input" />
									<span className="icon is-small is-left">
										<i className="fa fa-user"/>
									</span>
								</div>
							</div>

							<div className="field">
								<label className="label">Email</label>
								<div className="control has-icons-left">
									<input className="input" name="username" type="text" placeholder="Email input" />
									<span className="icon is-small is-left">
										<i className="fa fa-envelope"/>
									</span>
								</div>
							</div>

							<div className="field">
								<label className="label">Password</label>

								<div className="control has-icons-left">
									<input className="input" name="password" type="password" placeholder="Password"/>
									<span className="icon is-small is-left">
										<i className="fa fa-lock"/>
									</span>
								</div>
							</div>

							<br />
							<div>
								<button className="button is-warning" onClick={this.handleLogin}>Login</button> <space/>
								<button className="button is-warning" onClick={this.handleRegister}>Register</button>
							</div>

							<div className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"/>

						</form>

					</div>
				)}
			</div>
		)
	}
}

Account.propTypes = {
	user: PropTypes.object
}

function mapStateToProps(state) {
	return { auth: state.auth, user: state.auth.user }
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ login, register, logout }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
