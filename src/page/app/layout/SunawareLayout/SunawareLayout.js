import './SunawareLayout.css'
import NavBar from '../../navigation/NavBar/NavBar'
import CloudFooter from '../CloudFooter/CloudFooter'

import React from 'react'

function SunawareLayout(props) {
	return (
		<section className="welcome-page hero is-fullheight">
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