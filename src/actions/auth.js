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
