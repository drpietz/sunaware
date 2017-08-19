import {SYNCHRONIZE_TIMER, TOGGLE_TIMER, SYNCHRONIZE_ALLOWANCE} from '../actions/types'

const initialState = {
	timer: null,
	allowanceSyncTime: null,
	remainingAllowance: 0
}

export default function reports(state = initialState, action = {}) {
	switch (action.type) {
		case SYNCHRONIZE_TIMER:
			return {
				...state,
				timer: action.payload[0]
			}

		case TOGGLE_TIMER:
			return {
				...state,
				timer: action.payload
			}

		case SYNCHRONIZE_ALLOWANCE:
			return {
				...state,
				remainingAllowance: action.payload,
				allowanceSyncTime: new Date()
			}

		default:
			return state
	}
}