import { REPORT_SUBMIT } from '../actions/types'

const initialState = []

export default function reports(state = initialState, action = {}) {
	console.log('Action', action)
	switch (action.type) {
		case REPORT_SUBMIT:
			return [
				...state,
				action.payload
			]
		default:
			return state
	}
}