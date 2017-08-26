import './CalendarField.css'
import React from 'react'
import {Card, CardContent} from "bloomer";

import classNames from 'classnames'

function CalendarField(props) {

	return (
		<Card className={classNames("calendar-field", props.className)}>
			<CardContent className="calendar-field-content" isPaddingless>
				<div className="date">
					{props.date}
				</div>
				{props.value}
			</CardContent>
		</Card>
	)
}

export default CalendarField