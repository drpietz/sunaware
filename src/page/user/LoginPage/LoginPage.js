import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { FormErrors } from '../../../FormErrors'

import {login} from "../../../actions/auth"

import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'


class Login extends Component {

	constructor(props) {
		super(props);

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
                fieldValidationErrors.username = usernameValid ? '' : ' not an email address';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
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

	handleInputChange = event => {
		event.preventDefault()
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
	};

	handleLogin = event => {
		event.preventDefault();

		this.props.actions.login(this.state.username, this.state.password)
	}

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange}>
						<div className="box">
						<div className="field">
							<div className="control has-icons-left">
								<input className={"input"+ (this.props.errors ? " is-danger" : "")} name="username"
									   value={this.state.username}
									   type="text" placeholder="E-Mail address" />
								<span className="icon is-small is-left">
									<i className="fa fa-envelope"/>
								</span>
								<FormErrors formErrors={this.state.formErrors} />
							</div>
						</div>

						<div className="field">
							<div className="control has-icons-left">
								<input className={"input" + (this.props.errors ? " is-danger" : "")} name="password"
									   value={this.state.password}
									   type="password" placeholder="Password"/>
								<span className="icon is-small is-left">
									<i className="fa fa-lock"/>
								</span>
							</div>
						</div>

						<br />

						<div className="elements-spaced">
							<button  type="submit" className={"button is-warning" + (this.props.isPending ? " is-loading" : "")}  disabled={!this.state.formValid}
									 onClick={this.handleLogin}>Login</button>
						</div></div>
					</form>
				</Content>
			</PageBody>
		)
	}
}


function mapStateToProps(state) {
	return {
		isPending: state.auth.login.isPending,
		errors: state.auth.login.errors
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({login}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
