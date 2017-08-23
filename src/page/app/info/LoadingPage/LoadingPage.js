import React from 'react'
import PageBody from "../../layout/PageBody/PageBody";
import Content from "../../layout/Content/Content";
import LoadingIndicator from 'react-loading-indicator';

function LoadingPage() {
	return (
		<PageBody>
			<Content>
				<LoadingIndicator
					color={{
						red: 0,
						green: 0,
						blue: 0,
						alpha: 25 / 255
					}}
					spacing={10} segmentWidth={5} segmentLength={10} />
			</Content>
		</PageBody>
	)
}

export default LoadingPage