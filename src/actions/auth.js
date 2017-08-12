import { USER_LOGIN, USER_REGISTER, USER_LOGOUT, USER_PROFILE_UPDATE } from './types'
import GeoPoint from 'baqend/lib/GeoPoint'

export function login(username, password) {
	return {
		'BAQEND': {
			type: USER_LOGIN,
			payload: (db) => db.User.login(username, password)
		}
	}
}

export function register(username, password, displayname) {
	return {
		'BAQEND': {
			type: USER_REGISTER,
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

export function updateProfile(skinType, positioningEnabled, latitude, longitude) {
	let position = new GeoPoint(parseFloat(latitude), parseFloat(longitude));

	return {
		'BAQEND': {
			type: USER_PROFILE_UPDATE,
			payload: (db) => db.User.me.partialUpdate()
				.set('skinType', skinType)
				.set('positioningEnabled', positioningEnabled)
				.set('position', position)
				.execute()
		}
	}
}
