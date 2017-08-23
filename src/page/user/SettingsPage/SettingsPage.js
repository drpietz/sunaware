import React, {Component} from 'react'
import './SettingsPage.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {updateProfile} from "../../../actions/auth"

import Notifications, {notify} from 'react-notify-toast';
import Geosuggest from 'react-geosuggest';


import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'
import {Button, Checkbox, Control, Field, FieldBody, FieldLabel, Input, Label} from "bloomer";


class Settings extends Component {

	constructor(props) {
		super(props)
		this.state = {
			skinType: null,
			positioningEnabled: null,
			address: null,
			position: null
		}
	}


	componentWillReceiveProps(nextProps) {
		if (this.props.isPending && !nextProps.isPending) {
			if (nextProps.errors)
				notify.show(nextProps.errors.message, 'error', 2000)
			else
				notify.show('Account updated!', 'success', 2000)

		}
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		})
	}

	handleReactInputChange = (value, field) => {
		this.setState({
			[field]: value
		})
	}

	handlePositionSelect = ({description, location: {lat, lng}}) => {
		this.setState({
			address: description,
			position: {
				latitude: lat,
				longitude: lng
			}
		})
	}


	handleUpdate = (event) => {
		event.preventDefault()

		this.props.actions.updateProfile(
			this.state.skinType,
			this.state.positioningEnabled,
			this.state.position,
			this.state.address
		)
	}

	render () {
		return (
			<PageBody>
				<Notifications />

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
								<Checkbox name="positioningEnabled" defaultChecked={this.props.user.positioningEnabled}>
									Positioning enabled
								</Checkbox>
							</Control>
						</Field>

						{ !(this.state.positioningEnabled !== null ? this.state.positioningEnabled : this.props.user.positioningEnabled) ?
							<Field isHorizontal>
								<FieldLabel isSize="small">
									<Label>Location</Label>
								</FieldLabel>

								<FieldBody>
									<Geosuggest inputClassName="input"
												placeholder="Choose your location"
												name="position"
												initialValue={this.props.user.address}
												onSuggestSelect={this.handlePositionSelect}
												autoActivateFirstSuggest={true}/>
								</FieldBody>
							</Field>
							:
							null
						}

						<br/>

						<Field isGrouped="centered">
							<Button isColor="warning"
									isLoading={this.props.isPending}
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
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({updateProfile}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
