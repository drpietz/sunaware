import './StartPage.css'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SunClock from "../../user/SunClock/SunClock";
import UserReportsMap from '../UserReportsMap/UserReportsMap'
import UserReportsFeed from '../UserReportsFeed/UserReportsFeed'
import PageBody from "../../app/layout/PageBody/PageBody";


class Start extends Component {

	render() {
		return (
			<PageBody>
				<div className="overview-screen">
					<SunClock/>
					<Link to="/start/entry" className="report-weather-button button is-warning">+</Link>
					<UserReportsMap/>
					<UserReportsFeed/>
				</div>
			</PageBody>
		);
	}
}

export default Start