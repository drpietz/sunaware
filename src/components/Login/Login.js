import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { FormErrors } from './FormErrors'

import {Link} from 'react-router-dom'

import {login} from "../../actions/auth"

import PageBody from '../PageBody/PageBody'
import Content from '../Content/Content'


class Login extends Component {

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
            formErrors: {username: '', password: ''},
            usernameValid: false,
            passwordValid: false,
            formValid: false
		}
	}

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
                usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    clearForm() {

        this.state.username.value="";
        this.state.password.value="";
    }


	handleInputChange = event => {
		event.preventDefault()
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
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
							<FormErrors formErrors={this.state.formErrors} />

							<label className="label">E-Mail</label>
							<div className="control has-icons-left">
								<input className="input" name="username"
									   value={this.state.username}
									   type="text" placeholder="E-Mail address" />
								<span className="icon is-small is-left">
									<i className="fa fa-envelope"/>
								</span>
							</div>
						</div>

						<div className="field">
							<label className="label">Password</label>

							<div className="control has-icons-left">
								<input className="input" name="password"
									   value={this.state.password}
									   type="password" placeholder="Password"/>
								<span className="icon is-small is-left">
									<i className="fa fa-lock"/>
								</span>
							</div>
						</div>

						<br />

						<div className="elements-spaced">
							<button  type="submit" className="button is-warning"  disabled={!this.state.formValid}
									 onClick={this.handleLogin}>Login</button>
							<button className="button is-link" onClick={this.clearForm}>Clear</button>
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
