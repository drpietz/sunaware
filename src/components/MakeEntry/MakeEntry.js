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
								<input type="radio" name="rain" value="none" />
								<img src="/img/clouds/1.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="rain" value="normal" />
								<img src="/img/clouds/5.png"/>
							</label>
							<label classname="rad">
								<input type="radio" name="rain" value="strong" />
								<img src="/img/clouds/6.png"/>
							</label>
						</div>
					</section>
				</p>
				<p className="field">
					<label className="label">Cloudiness</label>
					<section className="section">
						<div className="container">
							<label className="rad">
								<input type="radio" name="clouds" value="none" />
								<img src="/img/clouds/1.png"/>
							</label>
							<label className="rad">
								<input type="radio" name="clouds" value="normal" />
								<img src="/img/clouds/2.png"/>
							</label>
							<label classname="rad">
								<input type="radio" name="clouds" value="strong" />
								<img src="/img/clouds/3.png"/>
							</label>
						</div>
					</section>
				</p>
				<div className="field">
					<label className="label">Temperature</label>
					<input className="input" name="Temperature" placeholder="Temperature in degrees"/>
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