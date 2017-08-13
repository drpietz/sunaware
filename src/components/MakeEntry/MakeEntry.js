import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
			temparature: null
		}
	}

	handleInputChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.actions.submitReport(this.state.clouds, this.state.rain, this.state.temparature)
	}

	render() {
		return (
			<PageBody>
				<Content>
					<form onChange={this.handleInputChange}>
						<p className="subtitle">
							Let us know about the weather at your place.
						</p>
						<div className="field">
							<label className="label">Rain type</label>
							<ImageSelect name="rain" values={[
								{ value: "0", img: "/img/weather/rain/0.png" },
								{ value: "2", img: "/img/weather/rain/2.png" },
								{ value: "3", img: "/img/weather/rain/3.png" }
							]}/>
						</div>
						<div className="field">
							<label className="label">Cloudiness</label>
							<ImageSelect name="clouds" values={[
								{ value: "0", img: "/img/weather/clouds/0.png" },
								{ value: "2", img: "/img/weather/clouds/2.png" },
								{ value: "4", img: "/img/weather/clouds/4.png" }
							]}/>
						</div>
						<div className="field">
							<label className="label">Temperature</label>
							<input className="input" name="temparature" placeholder="Temperature in degrees"/>
						</div>
						<div className="field is-grouped is-grouped-centered elements-spaced">
							<Link to="/start" className="button is-warning">Cancel</Link>
							<button className="button is-warning" onClick={this.handleSubmit}>Submit</button>
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