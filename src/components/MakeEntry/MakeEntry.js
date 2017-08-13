import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import ImageSelect from '../ImageSelect/ImageSelect'

class MakeEntry extends Component {

	render() {

		return (

			<div className="is-centered">
				<p className="subtitle">
					Let us know about the weather at your place.
				</p>
				<p className="field">
					<label className="label">Rain type</label>
					<ImageSelect name="rain" values={[
						{ value: "0", img: "/img/weather/rain/0.png" },
						{ value: "2", img: "/img/weather/rain/2.png" },
						{ value: "3", img: "/img/weather/rain/3.png" }
					]}/>
				</p>
				<p className="field">
					<label className="label">Cloudiness</label>
					<ImageSelect name="clouds" values={[
						{ value: "0", img: "/img/weather/clouds/0.png" },
						{ value: "2", img: "/img/weather/clouds/2.png" },
						{ value: "4", img: "/img/weather/clouds/4.png" }
					]}/>
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