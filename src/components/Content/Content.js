import React from 'react'

function Content(props) {
	return (
		<div className="content container has-text-centered">
			{props.children}
		</div>
	)
}

export default Content