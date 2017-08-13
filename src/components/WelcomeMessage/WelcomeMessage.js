import React from 'react'
import { Link } from 'react-router-dom'
import PageBody from "../PageBody/PageBody";
import Content from "../Content/Content";

function WelcomeMessage(props) {
	return (
		<PageBody>
			<Content>
				<h1 className="title">
					<strong>Welcome to Sunaware</strong>
				</h1>

				<p className="subtitle">
					We are providing you with the latest information about weather, your local UV index and how to protect yourself from UV radiation considering your personal skin type.
					Additionally, users can give you real-time information about their current weather situations.
				</p>

				<div className="field is-grouped is-grouped-centered">
					<p className="control">
						<Link to="/start" className="button is-warning">
							Sign up
						</Link>
					</p>
					<p className="control">
						<Link to="/account" className="button is-warning">
							Login
						</Link>
					</p>
				</div>
			</Content>
		</PageBody>
	)
}

export default WelcomeMessage