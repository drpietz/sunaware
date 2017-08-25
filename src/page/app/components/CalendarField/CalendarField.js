import './CalendarField.css'
import React from 'react'
import {Card, CardContent} from "bloomer";

function CalendarField(props) {

	return (
		<Card className="calender-field">
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