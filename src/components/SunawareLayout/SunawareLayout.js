import './SunawareLayout.css'
import NavBar from '../NavBar/NavBar'
import CloudFooter from '../CloudFooter/CloudFooter'

import React from 'react'

function SunawareLayout(props) {
	return (
		<section className="welcome-page hero is-fullheight">
			<div className="hero-head">
				<NavBar/>
			</div>

			<div className="welcome-body hero-body">
				<div className="container has-text-centered">
					{props.children}
				</div>
			</div>

			<div className="welcome-foot hero-foot">
				<CloudFooter/>
			</div>
		</section>
	);
}

export default SunawareLayout