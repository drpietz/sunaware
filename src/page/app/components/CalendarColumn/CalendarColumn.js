import React from 'react'
import '../CalendarField/CalendarField'
import CalendarField from "../CalendarField/CalendarField";
import {Column, Columns} from "bloomer";

function CalendarColumn(props) {
	return (
		<Columns isMobile>
			{ props.values.map(value => (
			<Column>
				<CalendarField value={value} date={5} />
			</Column>
			))}
		</Columns>
	)
}

export default CalendarColumn