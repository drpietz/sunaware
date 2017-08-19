import './Start.css'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SunClock from "../SunClock/SunClock";
import UserReportsMap from '../UserReportsMap/UserReportsMap'
import UserReportsFeed from '../UserReportsFeed/UserReportsFeed'
import Content from "../Content/Content";
import PageBody from "../PageBody/PageBody";


class Start extends Component {

	render() {
		return (
			<PageBody>
				<div className="overview-screen">
					<SunClock/>
					<UserReportsMap/>
					<UserReportsFeed/>
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