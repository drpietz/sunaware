import './SunawareLayout.css'
import NavBar from '../NavBar/NavBar'
import CloudFooter from '../CloudFooter/CloudFooter'
import SunClock from '../SunClock/SunClock'

import React from 'react'

function SunawareLayout(props) {
	return (
		<section className="welcome-page hero is-fullheight">
			<SunClock/>

			<div className="hero-head">
				<NavBar/>
			</div>

			{props.children}

			<div className="welcome-foot hero-foot">
				<CloudFooter/>
			</div>
		</section>
	);
}

export default SunawareLayout