import {
	USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
	USER_REGISTER_PENDING, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_PENDING, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_ERROR,
	USER_POSITIONING_PENDING, USER_POSITIONING_SUCCESS, USER_POSITIONING_ERROR,
	USER_LOCATION_UPDATE,
	USER_POSITIONING_DISABLE
} from './types'

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

export function triggerPositionUpdate() {
	return dispatch => {
		dispatch(userPositioningPending())

		navigator.geolocation.getCurrentPosition(
			({coords: {latitude, longitude}}) => {
				dispatch(userPositioningSuccess())
				dispatch(updatePosition(latitude, longitude))
			},
			(error) => {
				dispatch(userPositioningError(error))
				dispatch(disablePositioning())
			}
		);
	}
}

function userPositioningPending() {
	return {
		type: USER_POSITIONING_PENDING
	}
}

function userPositioningSuccess() {
	return {
		type: USER_POSITIONING_SUCCESS
	}
}

function userPositioningError(error) {
	return {
		type: USER_POSITIONING_ERROR,
		error
	}
}

export function updatePosition(latitude, longitude) {
	return {
		'BAQEND': {
			type: USER_LOCATION_UPDATE,
			payload: db => db.User.me.load().then(user => {
				user.position = new db.GeoPoint(latitude, longitude)
				return user.save()
			})
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

export function updateProfile(skinType, positioningEnabled, position, address) {
	return {
		'BAQEND': {
			types: [
				USER_PROFILE_UPDATE_PENDING,
				USER_PROFILE_UPDATE_SUCCESS,
				USER_PROFILE_UPDATE_ERROR
			],
			payload: (db) => db.User.me.load().then(user => {
				if (skinType !== null)
					user.skinType = skinType

				if (positioningEnabled !== null)
					user.positioningEnabled = positioningEnabled

				if (position !== null)
					user.position = new db.GeoPoint(position)

				if (address !== null)
					user.address = address

				return user.save()
			})
		}
	}
}
