import React from 'react'

function WelcomeMessage(props) {
	return (
		<div>
			<h1 className="title">
				<strong>Welcome to Sunaware</strong>
			</h1>
			<p className="subtitle">
				We are providing you with the latest information about weather, your local UV index and how to protect yourself from UV radiation considering your personal skin type.
				Additionally, users can give you real-time information about their current weather situations.
			</p>
			<p>
				<a href="#" className="button">Sign up</a>
				<a href="#" className="button">Login</a>
			</p>
		</div>
	)
}

export default WelcomeMessage