import {
	FETCH_OLD_REPORTS, RECEIVE_NEW_REPORTS,
	SELECT_REPORT, DESELECT_REPORT,
	REPORT_SUBMIT_PENDING, REPORT_SUBMIT_SUCCESS, REPORT_SUBMIT_ERROR
} from '../actions/types'

import {getBaqendErrorState, getPendingState, getSuccessState} from "./index";

const initialState = {
	initial: [],
	recent: [],
	all: [],
	submit: {
		isPending: false,
		errors: null
	},
	selected: null
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

		case SELECT_REPORT:
			return {...state, selected: action.report}
		case DESELECT_REPORT:
			return {...state, selected: null}

		case REPORT_SUBMIT_PENDING:
			return { ...state, submit: getPendingState()}
		case REPORT_SUBMIT_SUCCESS:
			return { ...state, ...buildState(state.initial, [...state.recent, action.payload]), selected: action.payload, submit: getSuccessState()}
		case REPORT_SUBMIT_ERROR:
			return { ...state, submit: getBaqendErrorState(action)}
		default:
			return state
	}
}