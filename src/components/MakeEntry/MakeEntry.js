import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormErrors } from '../../FormErrors'

import Notifications, {notify} from 'react-notify-toast';
import { submitReport } from '../../actions/reports'

import ImageSelect from '../ImageSelect/ImageSelect'
import Content from "../Content/Content";
import PageBody from "../PageBody/PageBody";

class MakeEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rain: '',
			clouds: '',
			temperature: '',
            formErrors: {rain: '', clouds: '', temperature: ''},
            rainValid: false,
            cloudsValid: false,
            temperatureValid: false,
            formValid: false
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
                fieldValidationErrors.rain = rainValid ? '' : ' is invalid';
                break;
            case 'clouds':
                cloudsValid = value.match(/^([0,1,2,3,4])$/i);
                fieldValidationErrors.clouds = cloudsValid ? '' : ' is invalid';
                break;
            case 'temperature':
                temperatureValid = value.length <= 3;
                fieldValidationErrors.temperature = temperatureValid ? '': ' is invalid';
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
		this.props.actions.submitReport(this.state.clouds, this.state.rain, this.state.temparature)
		notify.show('Weather Reported!', 'success', 2000 )
	}

    clearForm() {
        this.state.rain.value="";
        this.state.clouds.value="";
        this.state.temperature.value="";
    }

	render() {
		return (
			<PageBody>
				<Content size="medium">
					<form onChange={this.handleInputChange}>
						<p className="subtitle">
							Let us know about the weather at your place.
						</p>
						<div className="field">
							<FormErrors formErrors={this.state.formErrors} />
							<label className="label">Rain type</label>
							<ImageSelect name="rain"
										 value={this.state.rain}
										 values={[0,1,2,3].map(v => ({
									value: v,
									img: '/img/weather/rain/' + v + '.png'
								}))

                            }/>
						</div>
						<div className="field">
							<label className="label">Cloudiness</label>
							<ImageSelect name="clouds"
										 value={this.state.clouds}
										 values={[0,1,2,3,4].map(v => ({
									value: v,
									img: '/img/weather/clouds/' + v + '.png'
								}))
							}/>
						</div>
						<div className="field">
							<label className="label">Temperature</label>
							<input className="input" name="temperature" value={this.state.temperature} placeholder="Temperature in degrees"/>
						</div>
						<div className="field is-grouped is-grouped-centered elements-spaced">
							<button className="button is-warning"
									disabled={!this.state.formValid}
									onClick={this.handleSubmit}>Submit</button>
							<button className="button is-link" onClick={this.clearForm}>Clear</button>
							<Notifications />
						</div>
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