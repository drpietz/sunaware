import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { FormErrors } from '../../../FormErrors'

import {register} from "../../../actions/auth"

import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'
import {Box, Button, Control, Field, Icon, Input} from "bloomer";


class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayname: null,
			username: null,
			password: null,
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
                displaynameValid = value.match(/^((\s*[a-z0-9]){3,20})$/i)
                fieldValidationErrors.displayname = displaynameValid ? '' : 'not a valid name'
                break;
            case 'username':
                usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.username = usernameValid ? '' : ' not an email address'
                break;
            case 'password':
            	passwordValid = false
                if(value.length < 3)
                	fieldValidationErrors.password = 'password must be be at least 3 characters long'
				else if (value.length >= 36)
					fieldValidationErrors.password = 'password may not exceed 36 characters'
                else {
					passwordValid = true
					fieldValidationErrors.password = ''
				}
				break
            default:
                break
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
						<Box>
							<Field>
								<Control hasIcons="left">
									<Input name="displayname" placeholder="Displayname"
										   isColor={this.props.errors && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-user" />
									</Icon>
								</Control>
							</Field>

							<Field>
								<Control hasIcons="left">
									<Input name="username" placeholder="E-Mail address"
										   isColor={this.props.errors && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-envelope" />
									</Icon>
								</Control>
							</Field>

							<Field>
								<Control hasIcons="left">
									<Input name="password" placeholder="Password" type="password" />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-lock" />
									</Icon>
								</Control>
							</Field>

							<Field isGrouped="centered">
								<Button isColor="warning"
										isLoading={this.props.isPending}
										disabled={!this.state.formValid}
										onClick={this.handleSignUp}>
									Sign Up
								</Button>
							</Field>
						</Box>
						<FormErrors formErrors={this.state.formErrors} />
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
