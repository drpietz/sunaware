import './CalendarField.css'
import React from 'react'
import {Card, CardContent} from "bloomer";

function CalendarField(props) {

	return (
		<Card className="calender-field">
			<CardContent isPaddingless>
				{props.children}
			</CardContent>
		</Card>
	)
}

export default CalendarField