import React from 'react'
import '../../../app/components/CalendarCard/CalendarCard'
import CalendarCard from "../CalendarCard/CalendarCard";

function CalendarColumn(props) {
	return (
		<div className="columns">
			{ props.values.map(value => (
			<div className="column">
				<CalendarCard>
					{value}
				</CalendarCard>
			</div>
			))}
		</div>
	)
}

export default CalendarColumn