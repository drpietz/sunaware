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

		this.customErrorMessages = {
			409: {
				username: [
					'E-Mail is already in use'
				]
			}
		}

		this.state = {
			displayname: {
				value: null,
				getErrors: this.displaynameErrors,
				showErrors: false
			},
			username: {
				value: null,
				getErrors: this.usernameErrors,
				showErrors: false
			},
			password: {
				value: null,
				getErrors: this.passwordErrors,
				showErrors: false
			}
		}
	}

	baqendErrors = (field, props = this.props) => {
		if (props.errors) {
			if (props.errors.data)
				return props.errors.data[field] || []
			else if (props.errors.status in this.customErrorMessages)
				return [...(this.customErrorMessages[props.errors.status][field] || [])]
			else if (field === 'other')
				return [props.errors.message]
		}

		return []
	}

	displaynameErrors = (state = this.state) => {
		let value = state.displayname.value
		let errors = this.baqendErrors('displayname')

		if (value === null)
			errors.push('Name is required')
		else if (!value.match((/^((\s*[a-z0-9]){3,20})$/i)))
			errors.push('Name is not valid')

		return errors
	}

	usernameErrors = (state = this.state) => {
		let value = state.username.value
		let errors = this.baqendErrors('username')

		if (value === null)
			errors.push('E-Mail is required')
		else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
			errors.push('E-Mail is not valid')

		return errors
	}

	passwordErrors = (state = this.state) => {
		let value = state.password.value
		let errors = this.baqendErrors('password')

		if (value === null)
			errors.push('Password is required')
		else if (value.length < 3)
			errors.push('Password is too short')
		else if (value.length > 36)
			errors.push('Password is too long')

		return errors
	}

	fieldErrors = (fieldName, shownOnly = false, state = this.state) => {
		const field = this.state[fieldName]

		if (shownOnly && !field.showErrors)
			return []
		else
			return field.getErrors(state)
	}

	formErrors = (shownOnly = false, state = this.state) => {
		const fields = ['displayname', 'username', 'password']

		let errors = this.baqendErrors('other')
		fields.forEach(field => {
			errors = [...errors, ...this.fieldErrors(field, shownOnly, state)]
		})

		return errors
	}

    handleInputChange = event => {
		event.preventDefault();

        const name = event.target.name;
        const value = event.target.value;
        this.setState({
			[name]: {...this.state[name], value}
		});
	};

	handleInputBlur = event => {
		event.preventDefault()
		const name = event.target.name;

		this.setState({
			[name]: {...this.state[name], showErrors: true}
		})
	}

	handleSignUp = event => {
		event.preventDefault();
		this.props.actions.register(this.state.username.value, this.state.password.value, this.state.displayname.value)
	};

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange} onBlur={this.handleInputBlur}>
						<Box>
							<Field>
								<Control hasIcons="left">
									<Input name="displayname" placeholder="Displayname"
										   isColor={this.fieldErrors('displayname', true).length > 0 && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-user" />
									</Icon>
								</Control>
							</Field>

							<Field>
								<Control hasIcons="left">
									<Input name="username" placeholder="E-Mail address"
										   isColor={this.fieldErrors('username', true).length > 0 && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-envelope" />
									</Icon>
								</Control>
							</Field>

							<Field>
								<Control hasIcons="left">
									<Input name="password" placeholder="Password" type="password"
										   isColor={this.fieldErrors('password', true).length > 0 && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-lock" />
									</Icon>
								</Control>
							</Field>

							<Field isGrouped="centered">
								<Button isColor="warning"
										type="submit"
										isLoading={this.props.isPending}
										disabled={this.formErrors().length > 0}
										onClick={this.handleSignUp}>
									Sign Up
								</Button>
							</Field>
						</Box>
						<FormErrors formErrors={this.formErrors(true)} />
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
