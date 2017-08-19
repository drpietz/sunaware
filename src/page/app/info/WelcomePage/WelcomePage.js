import React from 'react'
import { Link } from 'react-router-dom'
import PageBody from "../../layout/PageBody/PageBody";
import Content from "../../layout/Content/Content";

function WelcomeMessage() {
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
					<div className="control">
						<Link to="/signup" className="button is-warning">
							Sign up
						</Link>
					</div>
					<div className="control">
						<Link to="/login" className="button is-warning">
							Login
						</Link>
					</div>
				</div>
			</Content>
		</PageBody>
	)
}

export default WelcomeMessage