import React, {Component} from 'react'
import PageBody from "../../app/layout/PageBody/PageBody"
import Content from "../../app/layout/Content/Content"
import './StatsPage.css'
import moment from 'moment'
import Calendar from "../../app/components/Calendar/Calendar";


class StatsPage extends Component {

	constructor(props) {
		super(props)

		this.state = {
			month: moment().startOf('month')
		}
	}



	render () {
		return(
			<PageBody>
				<Content size="large">
					<div className="month">
						<div className="left">
							&lt;
						</div>
						<div className="right">
							&gt;
						</div>
					</div>

					<Calendar month={moment()} />
				</Content>
			</PageBody>
		)
	}

}


export default StatsPage