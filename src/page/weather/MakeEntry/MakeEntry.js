import './MakeEntry.css'

import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormErrors } from '../../../FormErrors'

import {notify} from 'react-notify-toast';
import { submitReport } from '../../../actions/reports'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'
import Content from "../../app/layout/Content/Content";
import {
	Box, Button, Control, Field, Input, Label, Modal, ModalBackground, ModalClose, ModalContent,
	Subtitle
} from "bloomer";
import {withRouter} from "react-router";

class MakeEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {

			rain:{
				value: null,
				getErrors: this.rainErrors,
				showErrors: true
			},
			clouds:{
				value: null,
				getErrors: this.cloudsErrors,
				showErrors: true
			},
			temperature:{
				value: null,
				getErrors: this.temperatureErrors,
				showErrors: true
			}
		}
	}

	rainErrors = (state = this.state) => {
		let value = this.state.rain.value
		let errors = []

		if (value === null)
			errors.push('input is invalid')

			return errors
	}

	cloudsErrors = (state = this.state) => {
		let value = state.clouds.value
		let errors = []

		if (value === null)
			errors.push('input is invalid')

			return errors
	}

	temperatureErrors = (state = this.state) => {
		let value = state.temperature.value
		let errors = []

		if (value === null)
			errors.push('Temparature is required')
		else if (!value.match(/^-?\d{1,2}$/g))
			errors.push('please select an Input between -99 and 99 degrees')

		return errors
	}

	formErrors = (shownOnly = false, state = this.state) => {
		const fields = ['rain', 'clouds', 'temperature']

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
				this.props.history.push('/start')
		}
	}

	handleInputChange = event => {
		event.preventDefault()
        const name = event.target.name;
        const value = event.target.value;
			this.setState({
				[name]: {...this.state[name], value}
			});
	}

	handleReactInputChange = (value, field) => {
		this.setState({
			[field]: {...this.state[field], value}
		});
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.actions.submitReport(this.state.clouds.value, this.state.rain.value, this.state.temperature.value)
	}

	handleModalClose = event => {
		event.preventDefault()
		this.props.history.push('/start')
	}


	render() {
		return (
			<Modal isActive>
				<ModalBackground onClick={this.handleModalClose} />
				<ModalClose onClick={this.handleModalClose} />
				<ModalContent>
					<Content size="medium">
						<Box className="make-entry-box">
							<form onChange={this.handleInputChange}>
								<Subtitle isSize={5}>
									Let us know about the weather at your place.
								</Subtitle>

								<Field>
									<Label>
										Rain type
									</Label>

									<ImageSelect
										name="rain"
										defaultValue={this.state.rain}
										onChange={this.handleReactInputChange}
										values={[0,1,2,3].map(v => ({
											value: v,
											img: '/img/weather/rain/' + v + '.png'
										}))} />
								</Field>

								<Field>
									<Label>
										Cloudiness
									</Label>

									<ImageSelect
										name="clouds"
										defaultValue={this.state.clouds}
										onChange={this.handleReactInputChange}
										values={[0,1,2,3,4].map(v => ({
											value: v,
											img: '/img/weather/clouds/' + v + '.png'
										}))} />
								</Field>

								<Field>
									<Control>
										<Input name="temperature" placeholder="Temperature in degrees"
											   isColor={this.temperatureErrors().length > 0 && "danger"}
												/>

										<FormErrors formErrors={this.formErrors(true)} />
									</Control>
								</Field>

								<Field isGrouped="centered">
									<Button isColor="warning"
											type="submit"
											isLoading={this.props.isPending}
											disabled={this.formErrors().length > 0}
											onClick={this.handleSubmit}>
										Submit
									</Button>
								</Field>
							</form>
						</Box>
					</Content>
				</ModalContent>
			</Modal>
		);
	}
}


function mapStateToProps(state) {
	return {
		isPending: state.reports.submit.isPending,
		errors: state.reports.submit.errors
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ submitReport }, dispatch) }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MakeEntry))