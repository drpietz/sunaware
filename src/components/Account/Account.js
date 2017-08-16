import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notifications, {notify} from 'react-notify-toast';


import { login, register, logout, updateProfile } from '../../actions/auth'

import ImageSelect from '../ImageSelect/ImageSelect'
import Content from '../Content/Content'
import PageBody from "../PageBody/PageBody";

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: null,
			password: null,
			displayname: null,
			positioningEnabled: null,
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
		this.props.actions.updateProfile({
			positioningEnabled: this.state.positioningEnabled,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			skinType: this.state.skinType
		})
		notify.show('Account updated', 'success', 2000 )

	}

	handleRegister = (event) => {
		event.preventDefault()
		this.props.actions.register(this.state.username, this.state.password, this.state.displayname)
	}

	handleLogout = (event) => {
		event.preventDefault()
		this.props.actions.logout()
	}


	render() {
		if (this.props.auth.isLoggedIn) {
			return (
				<PageBody>
					<Content size="medium">
						Welcome, { this.props.user.displayname }
						<br/><br/>
						<form onChange={this.handleInputChange}>
							<div className="field">
								<label className="label">Skin type</label>
								<ImageSelect name="skinType" defaultValue={this.props.user.skinType} values={
									[0,1,2,3,4,5].map(v => ({
										value: v,
										img: '/img/user/skintypes/' + v + '.png'
									 }))
								}/>
							</div>

							<div className="field">
								<div className="control">
									<label className="checkbox">
										<input type="checkbox" name="positioningEnabled" defaultChecked={this.props.user.positioningEnabled}/>
										GPS enabled
									</label>
								</div>
							</div>

							<div className="field">
								<label className="label">Latitude</label>
								<input className="input" name="latitude" type="number" step="any" placeholder="Latitude" defaultValue={this.props.user.position ? this.props.user.position.latitude : null}/>
							</div>

							<div className="field">
								<label className="label">Longitude</label>
								<input className="input" name="longitude" type="number" step="any" placeholder="Longitude" defaultValue={this.props.user.position ? this.props.user.position.longitude : null}/>
							</div>

						<br/>
						<div className="field is-grouped is-grouped-centered elements-spaced">
							<button className="button is-warning" onClick={this.handleLogout}>Logout</button>
							<button className="button is-warning" onClick={this.handleUpdate}>Update</button>
							<Notifications />

						</div>
						</form>
					</Content>
				</PageBody>
			)
		} else {
			return (
				<PageBody>
					<Content size="small">
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

							<div className="elements-spaced">
								<button className="button is-warning" onClick={this.handleLogin}>Login</button>
								<button className="button is-warning" onClick={this.handleRegister}>Register</button>
							</div>
						</form>
					</Content>
				</PageBody>
			)
		}
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
