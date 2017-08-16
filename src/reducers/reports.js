import { REPORT_SUBMIT, FETCH_OLD_REPORTS, RECEIVE_NEW_REPORTS } from '../actions/types'

const initialState = {
	initial: [],
	recent: [],
	all: []
}

function buildState(initial, recent) {
	return {
		initial, recent,
		all: [...recent, ...initial]
	}
}

export default function reports(state = initialState, action = {}) {
	console.log('Action', action)
	switch (action.type) {
		case REPORT_SUBMIT:
			return buildState(state.initial, [...state.recent, action.payload])
		case FETCH_OLD_REPORTS:
			return buildState(action.payload, state.recent)
		case RECEIVE_NEW_REPORTS:
			return buildState(state.initial, action.payload)
		default:
			return state
	}
}