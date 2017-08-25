import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { FormErrors } from '../../../FormErrors'

import {login} from "../../../actions/auth"

import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'
import {Box, Button, Control, Field, Icon, Input} from "bloomer";


class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
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
			else if (field === 'other')
				return [props.errors.message]
		}

		return []
	}

	usernameErrors = (state = this.state) => {
		let value = state.username.value
		let errors = this.baqendErrors('username')

		if (value === null)
			errors.push('Name is required')

		return errors
	}

	passwordErrors = (state = this.state) => {
		let value = state.password.value
		let errors = this.baqendErrors('password')

		if (value === null)
			errors.push('Password is required')

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
		const fields = ['username', 'password']

		let errors = this.baqendErrors('other')
		fields.forEach(field => {
			errors = [...errors, ...this.fieldErrors(field, shownOnly, state)]
		})

		return errors
	}

	handleInputChange = event => {
		event.preventDefault()

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

	handleLogin = event => {
		event.preventDefault();

		this.props.actions.login(this.state.username.value, this.state.password.value)
	}

	render () {
		return (
			<PageBody>
				<Content size="small">
					<form onChange={this.handleInputChange} onBlur={this.handleInputBlur}>
						<Box>
							<Field>
								<Control hasIcons="left">
									<Input name="username" placeholder="E-Mail address"
										   type="username"
										   isColor={this.fieldErrors('username', true).length > 0 && "danger"} />

									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-envelope" />
									</Icon>
								</Control>
							</Field>

							<Field>
								<Control hasIcons="left">
									<Input name="password" placeholder="Password"
										   type="password"
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
										onClick={this.handleLogin}>
									Login
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
