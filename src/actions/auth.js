import { USER_LOGIN, USER_REGISTER, USER_LOGOUT, USER_PROFILE_UPDATE } from './types'
import { GeoPoint } from 'baqend'

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
			payload: (db) => {
				let command = db.User.me.partialUpdate()

				// TODO: Nur Latitude ODER Longitude geändert => nur eins von beiden null, trotzdem update?
				if (fields.latitude !== null && fields.longitude !== null) {
					let position = new GeoPoint(parseFloat(fields.latitude), parseFloat(fields.longitude))
					command.set('position', position)
				}

				if (fields.positioningEnabled !== null) {
					command.set('positioningEnabled', fields.positioningEnabled)
					console.log('positioning', fields.positioningEnabled)
				}

				if (fields.skinType !== null)
					command.set('skinType', fields.skinType)

				return command.execute()
			}
		}
	}
}
