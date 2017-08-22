import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormErrors } from '../../../FormErrors'

import Notifications, {notify} from 'react-notify-toast';
import { submitReport } from '../../../actions/reports'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'
import Content from "../../app/layout/Content/Content";
import PageBody from "../../app/layout/PageBody/PageBody";
import {Button, Control, Field, Input, Label, Subtitle} from "bloomer";

class MakeEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rain: '',
			clouds: '',
			temperature: '',
            formErrors: {rain: '', clouds: '', temperature: ''},
            formValid: false,
			rainValid: false,
			cloudsValid: false,
			temperatureValid: false
		}
	}

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let rainValid = this.state.rainValid;
        let cloudsValid = this.state.cloudsValid;
        let temperatureValid = this.state.temperatureValid;

        switch(fieldName) {
            case 'rain':
                rainValid = value.match(/^([0,1,2,3])$/i);
                fieldValidationErrors.rain = rainValid ? '' : ' input is invalid';
                break;
            case 'clouds':
                cloudsValid = value.match(/^([0,1,2,3,4])$/i);
                fieldValidationErrors.clouds = cloudsValid ? '' : ' input is invalid';
                break;
            case 'temperature':
                temperatureValid = value.match(/^-?\d{1,2}$/g);
                fieldValidationErrors.temperature = temperatureValid ? '': 'please select an Input between -99 and 99 degrees';
     			 break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            rainValid: rainValid,
            cloudsValid: cloudsValid,
            temperatureValid: temperatureValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.rainValid && this.state.cloudsValid && this.state.temperatureValid});
    }

	handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
	};

	handleSubmit = event => {
		event.preventDefault()
		this.props.actions.submitReport(this.state.clouds, this.state.rain, this.state.temperature)
		notify.show('Weather Reported!', 'success', 2000 )
	}

    handleBlur = (field) => (event) =>  {
      //TODO: Implement handleBLur
        }

	render() {
		return (
			<PageBody>
				<Content size="medium">
					<form onChange={this.handleInputChange}>
						<Subtitle isSize={4}>
							Let us know about the weather at your place.
						</Subtitle>

						<Field>
							<Label>
								Rain type
							</Label>

							<ImageSelect
								name="rain"
								value={this.state.rain}
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
								value={this.state.clouds}
								values={[0,1,2,3,4].map(v => ({
									value: v,
									img: '/img/weather/clouds/' + v + '.png'
								}))} />
						</Field>

						<Field>
							<Control>
								<Input name="temperature" placeholder="Temperature in degrees"
									   isColor={this.props.temperatureValid && "danger"}
									   onBlur={this.handleBlur('temperature')} />

								<FormErrors formErrors={this.state.formErrors} />
							</Control>
						</Field>

						<br />

						<Field isGrouped="centered">
							<Button isColor="warning"
									isLoading={this.props.isPending}
									disabled={!this.state.formValid}
									onClick={this.handleSubmit}>
								Submit
							</Button>
						</Field>
					</form>
				</Content>
			</PageBody>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ submitReport }, dispatch) }
}

export default connect(null, mapDispatchToProps)(MakeEntry)