import React from 'react'
import { Link } from 'react-router-dom'
import PageBody from "../../layout/PageBody/PageBody";
import Content from "../../layout/Content/Content";
import {Control, Field, Subtitle, Title} from "bloomer";

function WelcomeMessage() {
	return (
		<PageBody>
			<Content>
				<Title>
					<strong>Welcome to Sunaware</strong>
				</Title>

				<Subtitle isSize={4}>
					We are providing you with the latest information about weather, your local UV index and how to protect yourself from UV radiation considering your personal skin type.
					Additionally, users can give you real-time information about their current weather situations.
				</Subtitle>

				<Field isGrouped="centered">
					<Control>
						<Link to="/signup" className="button is-warning">
							Sign up
						</Link>
					</Control>
					<Control>
						<Link to="/login" className="button is-warning">
							Login
						</Link>
					</Control>
				</Field>
			</Content>
		</PageBody>
	)
}

export default WelcomeMessage