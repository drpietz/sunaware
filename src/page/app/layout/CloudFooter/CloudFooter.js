import './CloudFooter.css'

import React from 'react'

function CloudFooter(props) {
	return (
		<div className="cloud-footer disallow-overlapping">
			<div className="cloud-container">
				<img src="/img/background/layer_background.svg" className="cloud cloud-background" />
				<img src="/img/background/layer_foreground.svg" className="cloud cloud-foreground" />
			</div>
			<div className="credits">
				by Anne Kunstmann, Tim Pietz, Marcel Repenning, Benjamin Schmidtke
			</div>
		</div>
	)
}

export default CloudFooter