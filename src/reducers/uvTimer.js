import {SYNCHRONIZE_TIMER, TOGGLE_TIMER} from '../actions/types'

const initialState = {
	timer: null
}

export default function reports(state = initialState, action = {}) {
	switch (action.type) {
		case SYNCHRONIZE_TIMER:
			if (action.payload[0])
				console.log(typeof action.payload[0].start)
			return {
				...state,
				timer: action.payload[0]
			}

		case TOGGLE_TIMER:
			return {
				...state,
				timer: action.payload
			}


		default:
			return state
	}
}