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
			email: null,
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
		this.props.actions.register(this.state.username, this.state.password, this.state.email)
	}

	handleLogout = (event) => {
		this.props.actions.logout()
	}


	render() {
		return (
			<div className='account'>
				{ this.props.auth.isLoggedIn ? (
					<div className="column">
						Welcome, { this.props.user.username }
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
					<form onChange={this.handleInputChange}>
						<div className="field">
							<label className="label">Name</label>
							<div className="control has-icons-left has-icons-right">
								<input className="input" name="username" type="text" placeholder="Name input" />
								<span className="icon is-small is-left">
									<i className="fa fa-user"></i>
								</span></div></div>



						<div className="field">
							<label className="label">Password</label>

							<div className="control has-icons-left">
								<input className="input" name="password" type="password" placeholder="Password"/>
								<span className="icon is-small is-left">
									<i className="fa fa-lock"></i>
								</span>
							</div>
						</div>

						<div className="field">
							<label className="label">Email</label>
							<div className="control has-icons-left">
								<input className="input" name="email" type="text" placeholder="Email input" />
								<span className="icon is-small is-left">
									<i className="fa fa-envelope"></i>
								</span>
							</div>
						</div>
						<br />
						<div>
							<button className="button is-warning" onClick={this.handleLogin}>Login</button> <space/>
							<button className="button is-warning" onClick={this.handleRegister}>Register</button>
						</div>
					</form>
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
