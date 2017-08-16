import { TOGGLE_TIMER } from '../actions/types'

const initialState = {
	isRunning: false,
	startTime: null
}

export default function reports(state = initialState, action = {}) {
	switch (action.type) {
		case TOGGLE_TIMER:
			if (state.isRunning) {
				return {
					...state,
					isRunning: false,
					startTime: null
				}
			} else {
				return {
					...state,
					isRunning: true,
					startTime: new Date()
				}
			}
		default:
			return state
	}
}