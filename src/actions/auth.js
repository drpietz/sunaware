import { USER_LOGIN, USER_REGISTER, USER_LOGOUT, USER_PROFILE_UPDATE } from './types'
import { GeoPoint } from 'baqend/realtime'

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

export function updateProfile(fields) {
	return {
		'BAQEND': {
			type: USER_PROFILE_UPDATE,
			payload: (db) => db.User.me.load().then(user => {

				// TODO: Nur Latitude ODER Longitude geändert => nur eins von beiden null, trotzdem update?
				if (fields.latitude !== null && fields.longitude !== null) {
					user.position = new GeoPoint(parseFloat(fields.latitude), parseFloat(fields.longitude))
				}

				if (fields.positioningEnabled !== null) {
					user.positioningEnabled = fields.positioningEnabled
				}

				if (fields.skinType !== null)
					user.skinType = fields.skinType

				return user.save()
			})
		}
	}
}
