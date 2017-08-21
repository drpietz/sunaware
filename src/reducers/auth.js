import {
	USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR,
	USER_REGISTER_PENDING, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_PENDING, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_ERROR
} from '../actions/types'

import { BAQEND_CONNECTED } from 'redux-baqend'

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
			return { ...state, login: {isPending: true, errors: null}}
		case USER_LOGIN_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, login: {isPending: false, errors: null}}
		case USER_LOGIN_ERROR:
			return { ...state, login: {isPending: false, errors: action.payload.cause}}
		case USER_REGISTER_PENDING:
			return { ...state, register: {isPending: true, errors: null}}
		case USER_REGISTER_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, register: {isPending: false, errors: null}}
		case USER_REGISTER_ERROR:
			return { ...state, register: {isPending: false, errors: action.payload.cause}}
		case USER_LOGOUT:
			return { ...state, user: null, isLoggedIn: false }
		case USER_PROFILE_UPDATE_PENDING:
			return { ...state, update: {isPending: true, errors: null}}
		case USER_PROFILE_UPDATE_SUCCESS:
			return { ...state, update: {isPending: false, errors: null}}
		case USER_PROFILE_UPDATE_ERROR:
			return { ...state, update: {isPending: false, errors: action.payload.cause}}
		default:
			return state
	}
}
