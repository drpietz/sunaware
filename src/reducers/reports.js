import {
	FETCH_OLD_REPORTS, RECEIVE_NEW_REPORTS,
	REPORT_SUBMIT_PENDING, REPORT_SUBMIT_SUCCESS, REPORT_SUBMIT_ERROR
} from '../actions/types'

import {getErrorState, getPendingState, getSuccessState} from "./index";

const initialState = {
	initial: [],
	recent: [],
	all: [],
	submit: {
		isPending: false,
		errors: null
	}
}

function buildState(initial, recent) {
	return {
		initial, recent,
		all: [...recent, ...initial]
	}
}

export default function reports(state = initialState, action = {}) {
	switch (action.type) {
		case FETCH_OLD_REPORTS:
			return {...state, ...buildState(action.payload, state.recent)}
		case RECEIVE_NEW_REPORTS:
			return {...state, ...buildState(state.initial, action.payload)}
		case REPORT_SUBMIT_PENDING:
			return { ...state, submit: getPendingState()}
		case REPORT_SUBMIT_SUCCESS:
			return { ...state, ...buildState(state.initial, [...state.recent, action.payload]), submit: getSuccessState()}
		case REPORT_SUBMIT_ERROR:
			return { ...state, submit: getErrorState(action)}
		default:
			return state
	}
}