import React from 'react'

function CalendarCard(props) {

	return (
		<div className="card calender-card">
			<div className="card-content">
				{props.children}
			</div>
		</div>
	)
}

export default CalendarCard