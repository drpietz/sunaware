import './SunawareLayout.css'
import NavBar from '../../navigation/NavBar/NavBar'
import CloudFooter from '../CloudFooter/CloudFooter'

import React from 'react'
import {Hero, HeroFooter, HeroHeader} from "bloomer";

function SunawareLayout(props) {
	return (
		<Hero isFullHeight className="welcome-page">
			<HeroHeader>
				<NavBar/>
			</HeroHeader>

			{props.children}

			<HeroFooter className="welcome-foot">
				<CloudFooter/>
			</HeroFooter>
		</Hero>
	);
}

export default SunawareLayout