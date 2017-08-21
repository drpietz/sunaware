import {
	USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
	USER_REGISTER_PENDING, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_PENDING, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_ERROR,
	USER_LOCATION_UPDATE,
	USER_POSITIONING_DISABLE
} from './types'

import { GeoPoint } from 'baqend/realtime'

export function login(username, password) {
	return {
		'BAQEND': {
			types: [
				USER_LOGIN_PENDING,
				USER_LOGIN_SUCCESS,
				USER_LOGIN_ERROR
			],
			payload: (db) => db.User.login(username, password)
		}
	}
}

export function register(username, password, displayname) {
	return {
		'BAQEND': {
			types: [
				USER_REGISTER_PENDING,
				USER_REGISTER_SUCCESS,
				USER_REGISTER_ERROR
			],
			payload: (db) => {
				let user = new db.User({
					username: username,
					displayname: displayname
				})

				return db.User.register(user, password)
			}
		}
	}
}

export function logout() {
	return {
		'BAQEND': {
			type: USER_LOGOUT,
			payload: (db) => db.User.logout()
		}
	}
}

export function disablePositioning() {
	return {
		'BAQEND': {
			type: USER_POSITIONING_DISABLE,
			payload: db => db.User.me.load().then(user => {
				user.positioningEnabled = false
				return user.save()
			})
		}
	}
}

export function updatePosition(latitude, longitude) {
	return {
		'BAQEND': {
			type: USER_LOCATION_UPDATE,
			payload: db => db.User.me.load().then(user => {
				user.position = new GeoPoint(latitude, longitude)
				return user.save()
			})
		}
	}
}

export function updateProfile(fields) {
	return {
		'BAQEND': {
			types: [
				USER_PROFILE_UPDATE_PENDING,
				USER_PROFILE_UPDATE_SUCCESS,
				USER_PROFILE_UPDATE_ERROR
			],
			payload: (db) => db.User.me.load().then(user => {
				if (fields.latitude !== null || fields.longitude !== null) {
					let lat, lon = 0;
					if (user.position) {
						lat = user.position.latitude;
						lon = user.position.longitude;
					}

					if (fields.latitude !== null)
						lat = parseFloat(fields.latitude)

					if (fields.longitude !== null)
						lon = parseFloat(fields.longitude)

					user.position = new GeoPoint(lat, lon);
				}

				if (fields.positioningEnabled !== null)
					user.positioningEnabled = fields.positioningEnabled

				if (fields.skinType !== null)
					user.skinType = fields.skinType

				return user.save()
			})
		}
	}
}
