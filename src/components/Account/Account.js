import './Account.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { login, register, logout, updateProfile } from '../../actions/auth'

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: null,
			password: null,
			displayname: null,
			positioningEnabled: true,
			latitude: null,
			longitude: null,
			skinType: null
		}
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		})
	}

	handleLogin = (event) => {
		event.preventDefault()
		this.props.actions.login(this.state.username, this.state.password)
	}

	handleUpdate = (event) => {
		event.preventDefault()
		this.props.actions.updateProfile(this.state.skinType, this.state.positioningEnabled, this.state.latitude, this.state.longitude)
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
								<section className="section">
									<div className="container">
										<label className="rad">
											<input type="radio" name="skin" value="white" />
											<img src="/skintype/1.png"/>
										</label>
										<label className="rad">
											<input type="radio" name="skin" value="colour" />
											<img src="/skintype/2.png"/>
										</label>
										<label className="rad">
											<input type="radio" name="skin" value="asian" />
											<img src="/skintype/3.png"/>
										</label>
										<label className="rad">
											<input type="radio" name="skin" value="mediterranian" />
											<img src="/skintype/4.png"/>
										</label>
										<label className="rad">
											<input type="radio" name="skin" value="dark" />
											<img src="/skintype/5.png"/>
										</label>
										<label classname="rad">
											<input type="radio" name="skin" value="black" />
											<img src="/skintype/6.png"/>
										</label>
									</div>
								</section>
							</p>

							<div className="field">
								<div className="control">
									<label className="checkbox">
										<input type="checkbox" name="positioningEnabled"/>
										GPS enabled
									</label>
								</div>
							</div>

							<div className="field">
								<label className="label">Longitude</label>
								<input className="input" name="longitude" type="number" step="any" placeholder="Longitude input"/>
							</div>


							<div className="field">
								<label className="label">Latitude</label>
								<input className="input" name="latitude" type="number" step="any" placeholder="Latitude input"/>
							</div>
						</form>
						<br/>
						<div className="field is-grouped is-grouped-centered">
							<p className="control">
							<button className="button is-warning" onClick={this.handleLogout}>Logout</button>
							</p>
							<p className="control">
							<button className="button is-warning" onClick={this.handleUpdate}>Update</button>
							</p>
						</div>
					</div>
				) : (
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
	return { actions: bindActionCreators({ login, register, logout, updateProfile}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
