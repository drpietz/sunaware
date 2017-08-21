import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { FormErrors } from '../../../FormErrors'

import {register} from "../../../actions/auth"

import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'


class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayname: '',
			username: '',
			password: '',
            formErrors: {displayname: '', username: '', password: ''},
            displaynameValid: false,
            usernameValid: false,
            passwordValid: false,
            formValid: false
		}
	}

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let displaynameValid = this.state.displaynameValid;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'displayname':
                displaynameValid = value.length >= 3;
                fieldValidationErrors.displayname = displaynameValid ? '' : ' is too short';
                break;
            case 'username':
                usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.username = usernameValid ? '' : ' has to be an email address';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
			displaynameValid: displaynameValid,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid && this.state.displaynameValid});
    }

    handleInputChange = event => {
		event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
	};

	handleSignUp = event => {
		event.preventDefault();

		this.props.actions.register(this.state.username, this.state.password, this.state.displayname)
	};

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange}>
						<div className="box">
						<div className="field">
								<FormErrors formErrors={this.state.formErrors} />

							<div className="control has-icons-left has-icons-right">
								<input className="input" name="displayname"
									   value={this.state.displayname}
									   type="text" placeholder="Displayname" />
								<span className="icon is-small is-left">
										<i className="fa fa-user"/>
									</span>
							</div>
						</div>

						<div className="field">

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
							<button className={"button is-warning" + (this.props.isPending ? " is-loading" : "")}
									disabled={!this.state.formValid}
									onClick={this.handleSignUp}>Sign Up</button>
						</div></div>
					</form>
				</Content>
			</PageBody>
		)
	}
}

function mapStateToProps(state) {
	return {
		isPending: state.auth.register.isPending,
		errors: state.auth.register.errors
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({register}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
