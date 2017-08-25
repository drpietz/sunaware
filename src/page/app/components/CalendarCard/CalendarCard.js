import './CalendarCard.css'
import React from 'react'
import {Card, CardContent} from "bloomer";

function CalendarCard(props) {

	return (
		<Card  className="calender-card">
			<CardContent isPaddingless>
				{props.children}
			</CardContent>
		</Card>
	)
}

export default CalendarCard