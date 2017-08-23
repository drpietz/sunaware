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
			username: null,
			password: null
		}
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
						<Box>
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
									<Input name="password" placeholder="Password"
										   type="password"
										   isColor={this.props.errors && "danger"} />
									<Icon isSize='small' isAlign='left'>
										<i className="fa fa-lock" />
									</Icon>
								</Control>
							</Field>
							<Field isGrouped="centered">
								<Button isColor="warning"
										isLoading={this.props.isPending}
										onClick={this.handleLogin}>
									Login
								</Button>
							</Field>
						</Box>
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
