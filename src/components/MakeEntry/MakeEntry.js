import './MakeEntry.css'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class MakeEntry extends Component {

	render() {

		return (

			<div className="is-centered">
				<p className="subtitle">
					Let us know about the weather at your place.
				</p>
				<p className="field">
					<label className="label">Rain type</label>
					<section className="section">
						<div className="container">
							<label className="rad">
								<input type="radio" name="rain" value="0" />
								<img src="/img/weather/rain/0.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="rain" value="2" />
								<img src="/img/weather/rain/2.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="rain" value="3" />
								<img src="/img/weather/rain/3.png"/>
							</label>
						</div>
					</section>
				</p>
				<p className="field">
					<label className="label">Cloudiness</label>
					<section className="section">
						<div className="container">
							<label className="rad">
								<input type="radio" name="clouds" value="0" />
								<img src="/img/weather/clouds/0.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="clouds" value="2" />
								<img src="/img/weather/clouds/2.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="clouds" value="4" />
								<img src="/img/weather/clouds/4.png"/>
							</label>
						</div>
					</section>
				</p>
				<div className="field">
					<label className="label">Temperature</label>
					<input className="input" name="temparature" placeholder="Temperature in degrees"/>
				</div>
				<div className="field is-grouped is-grouped-centered">
					<p className="control">
					<Link to="/start" className="button is-warning">Cancel</Link>
					</p>
					<p className="control">
					<Link to="/start" className="button is-warning">Submit</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default MakeEntry