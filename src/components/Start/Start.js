import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import UserReportsMap from '../UserReportsMap/UserReportsMap'


class Start extends Component {

	render() {
		return (
			<div className="is-centered">
				<UserReportsMap/>

				<Link to="/start/entry" className="button is-warning">Report weather</Link>
			</div>
		);
	}
}

export default Start