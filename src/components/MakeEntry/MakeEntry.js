import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Notifications, {notify} from 'react-notify-toast';
import { submitReport } from '../../actions/reports'

import ImageSelect from '../ImageSelect/ImageSelect'
import Content from "../Content/Content";
import PageBody from "../PageBody/PageBody";

class MakeEntry extends Component {
	constructor(props) {
		super(props)

		this.state = {
			rain: null,
			clouds: null,
			temperature: null
		}
	}

	handleInputChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}

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
							<label className="label">Rain type</label>
							<ImageSelect name="rain" values={
								[0,1,2,3].map(v => ({
									value: v,
									img: '/img/weather/rain/' + v + '.png'
								}))
							}/>
						</div>
						<div className="field">
							<label className="label">Cloudiness</label>
							<ImageSelect name="clouds" values={
								[0,1,2,3,4].map(v => ({
									value: v,
									img: '/img/weather/clouds/' + v + '.png'
								}))
							}/>
						</div>
						<div className="field">
							<label className="label">Temperature</label>
							<input className="input" name="temperature" placeholder="Temperature in degrees"/>
						</div>
						<div className="field is-grouped is-grouped-centered elements-spaced">
							<button className="button is-warning" onClick={this.handleSubmit}>Submit</button>
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