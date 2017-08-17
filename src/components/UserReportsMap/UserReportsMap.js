import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const Map = withGoogleMap(props => (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: 53.55, lng: 10.00 }}
			defaultOptions={{
				scrollwheel: false,
				streetViewControl: false
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

	static getCloudEmoji(report) {
		return "/img/noto/" + report.info.clouds + ".png"}

	mapReportsToMarkers = reports => (
		reports.map(report => ({
			position: {
				lat: report.info.position.latitude,
				lng: report.info.position.longitude
			},
			defaultAnimation: 2,
			key: report.id,
			options: {
				icon: UserReportsMap.getCloudEmoji(report)
			}
		}))
	)

	render() {
		return (
			<div style={{width: '100%', height: '100%', ...this.props.style}}>
				<Map
					containerElement={
						<div style={{ height: '100%' }} />
					}
					mapElement={
						<div style={{ height: '100%' }} />
					}
					markers={this.mapReportsToMarkers(this.props.reports)}
					/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		reports: state.reports.all
	}
}

export default connect(mapStateToProps, null)(UserReportsMap)