import React, {Component} from 'react'
import './SettingsPage.css'
import { Link } from 'react-router-dom'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {triggerPositionUpdate, updateProfile} from "../../../actions/auth"

import {notify} from 'react-notify-toast';
import Geosuggest from 'react-geosuggest';


import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'
import {Button, Checkbox, Control, Field} from "bloomer";


class Settings extends Component {

	constructor(props) {
		super(props)
		this.state = {
			skinType: {
				value: props.user.skinType,
				getErrors: this.skinTypeErrors,
				showErrors: true
			},
			positioningEnabled: {
				value: props.user.positioningEnabled,
				getErrors: this.positioningEnabledErrors,
				showErrors: true
			},
			address: {
				value: props.user.address,
				getErrors: this.addressErrors,
				showErrors: true
			},
			position: {
				value: props.user.position
			}
		}
	}

	skinTypeErrors = (state = this.state) => {
		let value = state.skinType.value
		let errors = []

		if (value === null)
			errors.push('SkinType is required')

		return errors
	}

	positioningEnabledErrors = (state = this.state) => {
		let value = state.positioningEnabled.value
		let errors = []

		if (value === null)
			errors.push('Position is required')

		return errors
	}

	addressErrors = (state = this.state) => {
		let value = state.address.value
		let errors = []

		if (value === null)
			errors.push('address is required')

		return errors
	}

	formErrors = (shownOnly = false, state = this.state) => {
		const fields = ['skinType', 'positioningEnabled', 'address']

		let errors = []
		fields.forEach(field => {
			if (!shownOnly || state[field].showErrors)
				errors = [...errors, ...state[field].getErrors()]
		})

		return errors
	}


	componentWillReceiveProps(nextProps) {
		if (this.props.isPending && !nextProps.isPending) {
			if (nextProps.errors)
				notify.show(nextProps.errors.message, 'error', 2000)
			else
				notify.show('Account updated!', 'success', 2000)
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (!this.state.positioningEnabled.value && nextState.positioningEnabled.value) {
			this.props.actions.triggerPositionUpdate()
		}

		if (this.props.positioningPending && !nextProps.positioningPending) {
			this.setState({
				positioningEnabled: {
					...this.state.positioningEnabled,
					value: !nextProps.positioningErrors
				}
			})
		}
	}

	handleInputChange = (event) => {
		event.preventDefault();
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if (name === 'positioningEnabled' && value === true) {
			this.props.actions.triggerPositionUpdate()
			return
		}


		this.setState({
			[name]: {...this.state[name], value}
		})
	}

	handleReactInputChange = (value, field) => {
		this.setState({
			[field]: {...this.state[field], value}
		})
	}

	handlePositionSelect = ({description, location: {lat, lng}}) => {
		this.setState({
			address: {
				...this.state.address,
				value: description
			},
			position: {
				...this.state.position,
				value: {
					latitude: lat,
					longitude: lng
				}
			}
		})
	}

	handleUpdate = (event) => {
		event.preventDefault()

		this.props.actions.updateProfile(
			this.state.skinType.value,
			this.state.positioningEnabled.value,
			this.state.position.value,
			this.state.address.value
		)
	}

	render () {
		return (
			<PageBody>
				<Content size="medium">
					Welcome, { this.props.user.displayname }
					<br/><br/>
					<form onChange={this.handleInputChange}>
						<Field>
							<ImageSelect name="skinType"
										 isFixed={this.props.user.skinType !== null} // Hauttyp darf nicht geändert werden
										 onChange={this.handleReactInputChange}
										 defaultValue={this.props.user.skinType}
										 values={
								[0,1,2,3,4,5].map(v => ({
									value: v,
									img: '/img/user/skintypes/' + v + '.png'
								}))
							}/>
						</Field>

						<Field>
							<Control>
								<Checkbox name="positioningEnabled" checked={this.state.positioningEnabled.value}>
									Positioning enabled
								</Checkbox>
							</Control>
						</Field>

						{ !(this.state.positioningEnabled.value !== null ? this.state.positioningEnabled.value : this.props.user.positioningEnabled.value) ?
							<Field>
									<Geosuggest inputClassName="input"
												placeholder="Choose your location"
												name="position"
												initialValue={this.props.user.address || ""}
												onSuggestSelect={this.handlePositionSelect}
												autoActivateFirstSuggest={true}/>
							</Field>
							:
							null
						}
						<Field isGrouped="centered">
							<Button isColor="warning"
									type="submit"
									isLoading={this.props.isPending}
									disabled={this.formErrors().length > 0}
									onClick={this.handleUpdate}>
								Update
							</Button>
						</Field>
					</form>
				</Content>
			</PageBody>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		isPending: state.auth.update.isPending,
		errors: state.auth.update.errors,
		positioningPending: state.auth.positioning.isPending,
		positioningErrors: state.auth.positioning.errors
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({updateProfile, triggerPositionUpdate}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
