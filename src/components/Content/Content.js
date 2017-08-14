import React from 'react'
import './Content.css'

function Content(props) {
	return (
		<div className="content container has-text-centered is-medium">
			{props.children}
		</div>
	)
}

export default Content