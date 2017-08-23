import {
	SYNCHRONIZE_TIMER, SYNCHRONIZE_ALLOWANCE,
	TOGGLE_TIMER_PENDING, TOGGLE_TIMER_SUCCESS, TOGGLE_TIMER_ERROR
} from '../actions/types'

import {getPendingState, getSuccessState, getErrorState} from "./index";

const initialState = {
	timer: null,
	toggleState: getSuccessState(),
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

		case TOGGLE_TIMER_PENDING:
			return {
				...state,
				toggleState: getPendingState()
			}

		case TOGGLE_TIMER_SUCCESS:
			return {
				...state,
				timer: action.payload,
				toggleState: getSuccessState()
			}

		case TOGGLE_TIMER_ERROR:
			return {
				...state,
				toggleState: getErrorState(action)
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