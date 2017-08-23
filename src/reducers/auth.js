import {
	USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
	USER_REGISTER_PENDING, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_PENDING, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_ERROR,
	USER_POSITIONING_DISABLE, USER_LOCATION_UPDATE
} from '../actions/types'

import { BAQEND_CONNECTED } from 'redux-baqend'
import {getErrorState, getPendingState, getSuccessState} from "./index";

const initialState = {
	login: {
		isPending: false,
		errors: null
	},
	register: {
		isPending: false,
		errors: null,
	},
	update: {
		isPending: false,
		errors: null,
	},
	isLoggedIn: false,
	user: null
}

export default function auth(state = initialState, action = {}) {
	switch (action.type) {
		case BAQEND_CONNECTED:
			return { ...state, user: action.user, isLoggedIn: !!action.user }
		case USER_LOGIN_PENDING:
			return { ...state, login: getPendingState()}
		case USER_LOGIN_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, login: getSuccessState()}
		case USER_LOGIN_ERROR:
			return { ...state, login: getErrorState(action)}
		case USER_REGISTER_PENDING:
			return { ...state, register: getPendingState()}
		case USER_REGISTER_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, register: getSuccessState()}
		case USER_REGISTER_ERROR:
			return { ...state, register: getErrorState(action)}
		case USER_LOGOUT:
			return { ...state, user: null, isLoggedIn: false }
		case USER_PROFILE_UPDATE_PENDING:
			return { ...state, update: getPendingState()}
		case USER_PROFILE_UPDATE_SUCCESS:
			return { ...state, user: action.payload, update: getSuccessState()}
		case USER_PROFILE_UPDATE_ERROR:
			return { ...state, update: getErrorState(action)}
		case USER_POSITIONING_DISABLE:
		case USER_LOCATION_UPDATE:
			return { ...state, user: action.payload}
		default:
			return state
	}
}
