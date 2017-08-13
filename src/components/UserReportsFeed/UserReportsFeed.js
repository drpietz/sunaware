import './UserReportsFeed.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'


class UserReportsFeed extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<ul style={this.props.style} className="report-feed">
				<li>Irgendwann</li>
				<li>sieht man hier</li>
				<li>die neuesten Meldungen</li>
				{this.props.reports.map(report => (
					<li key={report.id}>Clouds: {report.info.clouds}</li>
				))}
			</ul>
		)
	}
}


function mapStateToProps(state) {
	return {
		reports: state.reports
	}
}

export default connect(mapStateToProps, null)(UserReportsFeed)