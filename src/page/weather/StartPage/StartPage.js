import './StartPage.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import SunClock from "../../user/SunClock/SunClock";
import UserReportsMap from '../UserReportsMap/UserReportsMap'
import UserReportsFeed from '../UserReportsFeed/UserReportsFeed'
import PageBody from "../../app/layout/PageBody/PageBody";
import {Redirect} from "react-router";


class Start extends Component {

	render() {
		if (!this.props.profileFilled)
			return <Redirect to="/settings" />

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

function mapStateToProps(state) {
	return {
		profileFilled: state.auth.user.skinType !== null && state.auth.user.position !== null
	}
}

export default connect(mapStateToProps)(Start)