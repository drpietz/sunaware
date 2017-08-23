/* global google*/
import "./UserReportsMap.css"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

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

			<Marker key="user" position={props.user.position} />

			{props.markers.map((marker, index) => (
				<Marker
					key={marker.key}
					defaultAnimation={2}
					showInfo={false}
					position={marker.position}
					options={marker.options}
					onClick={() =>  props.onMarkerClick(marker)}>

					{marker.showInfo && (
						<InfoWindow className="popup" onCloseClick={() => props.onMarkerClose(marker)}>
							<div className="content">{marker.infoContent}</div>
						</InfoWindow>
					)}
				</Marker>
			))}
		</GoogleMap>
	)
)

class UserReportsMap extends Component {

	constructor(props) {
		super(props)

		this.cloud = ["clear", "slightly clouded", "party cloudy", "cloudy", "heavily clouded"];
		this.rainy = ["none", "drizzling", "heavily raining", "storming"];

		this.state = {
			selected: null
		}
	}

	static getCloudEmoji(report) {
		return "/img/noto/" + report.info.clouds + ".svg"
	}

	mapReportsToMarkers = reports => (
		reports.map(report => {
			let createdAt = new Date(report.createdAt);
			let hours = ('0' + createdAt.getHours()).slice(-2);
			let minutes = ('0' + createdAt.getMinutes()).slice(-2);

			return {
				position: {
					lat: report.info.position.latitude,
					lng: report.info.position.longitude
				},
				key: report.id,
				infoContent: (
					<div>
						<span><strong>Submitted:</strong></span> <span>{hours} : {minutes}</span> <br/>
						<span><strong>Weather:</strong></span> <span>{report.info.temperature} Degrees</span> <br/>
						<span><strong>Sky:</strong></span> <span>{this.cloud[report.info.clouds]}</span> <br/>
						<span><strong>Rain:</strong></span> <span>{this.rainy[report.info.rain]}</span>
					</div>),
				options: {
					icon: new window.google.maps.MarkerImage(UserReportsMap.getCloudEmoji(report),
						null, null, null,
						new window.google.maps.Size(30,30))
				},
				showInfo: this.state.selected === report.id
			}
		})
	)

	handleMarkerClick = (targetMarker) => {
		this.setState({
			...this.getState,
			selected: targetMarker.key
		})
	}

	handleMarkerClose = (targetMarker) => {
		this.setState({
			...this.getState,
			selected: null
		})
	}

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
					user={{
						position: {
							lat: this.props.userPosition.latitude,
							lng: this.props.userPosition.longitude
						}
					}}
					onMarkerClick={this.handleMarkerClick}
					onMarkerClose={this.handleMarkerClose}
					/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		reports: state.reports.all,
		userPosition: state.auth.user.position
	}
}

export default connect(mapStateToProps, null)(UserReportsMap)