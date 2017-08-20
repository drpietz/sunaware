import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {updateProfile} from "../../../actions/auth"

import Notifications, {notify} from 'react-notify-toast';

import PageBody from '../../app/layout/PageBody/PageBody'
import Content from '../../app/layout/Content/Content'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'


class Settings extends Component {

	constructor(props) {
		super(props)
		this.state = {
			skinType: null,
			positioningEnabled: null,
			latitude: null,
			longitude: null
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

	handleUpdate = (event) => {
		event.preventDefault()
		this.props.actions.updateProfile({
			positioningEnabled: this.state.positioningEnabled,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			skinType: this.state.skinType
		})

		notify.show('Account updated', 'success', 2000)
	}

	render () {
		return (
			<PageBody>
				<Notifications />

				<Content size="medium">
					Welcome, { this.props.user.displayname }
					<br/><br/>
					<form onChange={this.handleInputChange}>
						<div className="field">
							<label className="label">Skin type</label>
							<ImageSelect name="skinType" defaultValue={this.props.user.skinType} values={
								[0,1,2,3,4,5].map(v => ({
									value: v,
									img: '/img/user/skintypes/' + v + '.png'
								}))
							}/>
						</div>

						<div className="field">
							<div className="control">
								<label className="checkbox">
									<input type="checkbox" name="positioningEnabled"
										   defaultChecked={this.props.user.positioningEnabled}/>
									GPS enabled
								</label>
							</div>
						</div>

						<div className="field">
							<label className="label">Latitude</label>
							<input className="input" name="latitude"
								   type="number" step="any" placeholder="Latitude"
								   defaultValue={this.props.user.position ? this.props.user.position.latitude : null}/>
						</div>

						<div className="field">
							<label className="label">Longitude</label>
							<input className="input" name="longitude"
								   type="number" step="any" placeholder="Longitude"
								   defaultValue={this.props.user.position ? this.props.user.position.longitude : null}/>
						</div>

						<br/>
						<div className="field is-grouped is-grouped-centered elements-spaced">
							<button className="button is-warning" onClick={this.handleUpdate}>Update</button>
						</div>
					</form>
				</Content>
			</PageBody>
		)
	}
}


function mapStateToProps(state) {
	return {
		user: state.auth.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({updateProfile}, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
