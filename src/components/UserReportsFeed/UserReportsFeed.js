import './UserReportsFeed.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'


class UserReportsFeed extends Component {
	constructor(props) {
		super(props)
	}

	static getCloudEmoji(report) {
		return <img className="emoji" src={"/img/noto/" + report.info.clouds + ".svg"}/>
	}

	render() {
		return (
			<ul style={this.props.style} className="report-feed">
				{this.props.reports.map(report => (
					<li key={report.id}>{UserReportsFeed.getCloudEmoji(report)}</li>
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