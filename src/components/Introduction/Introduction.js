import './Introduction.css'
import React, { Component} from 'react'
import {Link} from 'react-router-dom'

class Introduction extends Component {

	render() {
		return (
			<div className="layout">
				<div className="hero is-fullheight bg-img">

					<div className="hero-body">
						<div className="container">
							<h1 className="title">
								<strong>Welcome to Sunaware</strong>
							</h1>
							<p className="subtitle">
								We are providing you with the latest information about weather, your local UV index and how to protect yourself from UV radiation considering your personal skin type.
								Additionally, users can give you real-time information about their current weather situations.
							</p>
							<p>
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
							</p>
						</div>
					</div>
					<div className="hero-foot">
						<nav className="tabs is-boxed is-fullwidth">
							<div className="container has-text-centered ">
								<span><small>by Anne Kunstmann, Tim Pietz, Marcel Repenning, Benjamin Schmidtke</small></span>
							</div>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}
export default Introduction