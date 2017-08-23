import './UserReportsFeed.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import classNames from 'classnames'
import {selectReport} from "../../../actions/reports";


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

	handleReportSelect = (report) => {
		this.props.actions.selectReport(report)
	}

	render() {
		return ( // TODO: Comparison with selected report?
			<ul style={this.props.style} className="report-feed">
				{this.props.reports.map(report => (
					<li key={report.id}
						className={classNames({"selected": this.props.selected && (report.id === this.props.selected.id)})}
						onClick={() => this.handleReportSelect(report)}>
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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({selectReport}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReportsFeed)