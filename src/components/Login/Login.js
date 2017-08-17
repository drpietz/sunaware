import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {login} from "../../actions/auth"

import PageBody from '../PageBody/PageBody'
import Content from '../Content/Content'


class Login extends Component {

	constructor(props) {
		super(props)

		this.state = {
			username: null,
			password: null
		}
	}

	handleInputChange = event => {
		event.preventDefault()

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleLogin = event => {
		event.preventDefault()

		this.props.actions.login(this.state.username, this.state.password)
	}

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange}>
						<div className="field">
							<label className="label">E-Mail</label>
							<div className="control has-icons-left">
								<input className="input" name="username" type="text" placeholder="E-Mail address" />
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
							<Link to="/" className="button is-warning">Back</Link>
							<button className="button is-warning" onClick={this.handleLogin}>Login</button>
						</div>
					</form>
				</Content>
			</PageBody>
		)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({login}, dispatch)
	}
}


export default connect(null, mapDispatchToProps)(Login)
