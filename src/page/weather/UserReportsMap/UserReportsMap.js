import "./UserReportsMap.css"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import {styles} from './style.json'


const Map = withGoogleMap(props => (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: 53.55, lng: 10.00 }}
			defaultOptions={{
				scrollwheel: false,
				streetViewControl: false,
				styles
			}}
			>
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
		return "/img/noto/" + report.info.clouds + ".svg"}

	mapReportsToMarkers = reports => (
		reports.map(report => ({
			position: {
				lat: report.info.position.latitude,
				lng: report.info.position.longitude
			},
			defaultAnimation: 2,
			key: report.id,
			options: {
				icon: new window.google.maps.MarkerImage(UserReportsMap.getCloudEmoji(report),
					null, null, null,
					new window.google.maps.Size(30,30))
			}
		}))
	)

	render() {
		return (
			<div className="report-map">
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