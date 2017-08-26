import './StatsPage.css'

import React, {Component} from 'react'
import PageBody from "../../app/layout/PageBody/PageBody"
import Content from "../../app/layout/Content/Content"
import moment from 'moment'
import Calendar from "../../app/components/Calendar/Calendar";
import MonthSelect from "../../app/components/MonthSelect/MonthSelect";


class StatsPage extends Component {

	constructor(props) {
		super(props)

		this.state = {
			month: moment().startOf('month')
		}
	}

	changeMonth = next => {
		this.setState({
			month: next
		})
	}

	render () {
		return(
			<PageBody>
				<Content size="large">
					<MonthSelect month={this.state.month} onChange={this.changeMonth} />

					<Calendar month={this.state.month} />
				</Content>
			</PageBody>
		)
	}

}


export default StatsPage