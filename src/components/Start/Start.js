import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import UserReportsMap from '../UserReportsMap/UserReportsMap'
import Content from "../Content/Content";
import PageBody from "../PageBody/PageBody";


class Start extends Component {

	render() {
		return (
			<PageBody>
				<div style={{ width: '100%', height: 'calc(100vh - 3.25rem)' }}>
					<UserReportsMap />
				</div>

				<Content>
					<Link to="/start/entry" className="button is-warning">Report weather</Link>
				</Content>
			</PageBody>
		);
	}
}

export default Start