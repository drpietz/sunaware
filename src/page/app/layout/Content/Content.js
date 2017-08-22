import React from 'react'
import './Content.css'
import {Container} from "bloomer";

function Content(props) {
	let size;
	if (["small", "medium", "large"].includes(props.size))
		size = " is-" + props.size
	else
		size = ""

	return (
		<Container hasTextAlign="centered" className={"content" + size}>
			{props.children}
		</Container>
	)
}

export default Content