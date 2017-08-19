import React from 'react'
import './Content.css'

function Content(props) {
	let size;
	if (["small", "medium", "large"].includes(props.size))
		size = " is-" + props.size
	else
		size = ""

	return (
		<div className={"content container has-text-centered" + size}>
			{props.children}
		</div>
	)
}

export default Content