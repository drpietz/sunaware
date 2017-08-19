import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { FormErrors } from '../../FormErrors'

import {register} from "../../actions/auth"

import PageBody from '../PageBody/PageBody'
import Content from '../Content/Content'


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
                fieldValidationErrors.displayname = displaynameValid ? '' : ' is invalid';
                break;
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

    clearForm() {
		this.state.displayname.value="";
        this.state.username.value="";
        this.state.password.value="";
    }

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange}>
						<div className="field">
							<FormErrors formErrors={this.state.formErrors} />

							<label className="label">Name</label>
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
							<button className="button is-warning"
									disabled={!this.state.formValid}
									onClick={this.handleSignUp}>Sign Up</button>
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
		actions: bindActionCreators({register}, dispatch)
	}
}


export default connect(null, mapDispatchToProps)(SignUp)
