import './UserReportsFeed.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'


class UserReportsFeed extends Component {
	constructor(props) {
		super(props)
	}

	static getCloudEmoji(report) {
		if(report.info.rain === 0) {
			return <img className="emoji" src={"/img/noto/" + report.info.clouds + ".svg"}/>
		}
		else {
			return <img className="emoji" src={"/img/noto/6.svg"}/>
		}

	}

	render() {
		return (
			<ul style={this.props.style} className="report-feed">
				{this.props.reports.map(report => (
					<li key={report.id} className={classNames({"selected": report === this.props.selected})}>
						{UserReportsFeed.getCloudEmoji(report)}
					</li>
				))}
			</ul>
		)
	}
}


function mapStateToProps(state) {
	return {
		reports: state.reports.all,
		selected: state.reports.selected
	}
}

export default connect(mapStateToProps, null)(UserReportsFeed)