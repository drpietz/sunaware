import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withGoogleMap(props => (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: 53.55, lng: 10.00 }}
			defaultOptions={{
				scrollWheel: false
			}} >
			{props.markers.map((marker, index) => (
				<Marker
					{...marker}
				/>
			))}
		</GoogleMap>
	)
)

class UserReportsMap extends Component {
	constructor(props) {
		super(props)

		this.state = {
			reports: []
		}
	}

	mapReportsToMarkers = reports => (
		reports.map(report => ({
			position: {
				lat: report.position.latitude,
				lng: report.position.longitude
			},
			defaultAnimation: 2,
			key: report.id
		}))
	)

	render() {
		return (
			<div style={{ width: '1344px', height: '600px' }}>
				<Map
					containerElement={
						<div style={{ height: '100%' }} />
					}
					mapElement={
						<div style={{ height: '100%' }} />
					}
					markers={this.mapReportsToMarkers(this.state.reports)}
					/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		reports: state.reports
	}
}

export default connect(mapStateToProps, null)(UserReportsMap)