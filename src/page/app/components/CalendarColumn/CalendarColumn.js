import React from 'react'
import '../../../app/components/CalendarCard/CalendarCard'
import CalendarCard from "../CalendarCard/CalendarCard";
import {Column, Columns} from "bloomer";

function CalendarColumn(props) {
	return (
		<Columns isMobile>
			{ props.values.map(value => (
			<Column>
				<CalendarCard>
					{value}
				</CalendarCard>
			</Column>
			))}
		</Columns>
	)
}

export default CalendarColumn