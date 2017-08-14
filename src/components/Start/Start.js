import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import UserReportsMap from '../UserReportsMap/UserReportsMap'
import UserReportsFeed from '../UserReportsFeed/UserReportsFeed'
import Content from "../Content/Content";
import PageBody from "../PageBody/PageBody";


class Start extends Component {

	render() {
		return (
			<PageBody>
				<div style={{ width: '100%', height: 'calc(100vh - 3.25rem)', position: 'relative'}}>
					<UserReportsMap style={{width: 'calc(100% - 5rem)'}} />
					<UserReportsFeed style={{width: '5rem', height: '100%', position: 'absolute', top: '0', right: '0'}} />
				</div>
				<br/>
				<Content>
					<Link to="/start/entry" className="button is-warning">Report weather</Link>
				</Content>
			</PageBody>
		);
	}
}

export default Start