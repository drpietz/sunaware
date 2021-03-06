import {FETCH_SUMMARY_PENDING, FETCH_SUMMARY_SUCCESS, FETCH_SUMMARY_ERROR} from "../actions/types";


export default function(state = {}, action = {}) {
	switch (action.type) {
		case FETCH_SUMMARY_PENDING:
			return { ...state,
				[action.key]: {
					isPending: true,
					errors: null,
					data: null
				}
			}

		case FETCH_SUMMARY_SUCCESS:
			return { ...state,
				[action.key]: {
					isPending: false,
					errors: null,
					data: action.payload
				}
			}

		case FETCH_SUMMARY_ERROR:
			return { ...state,
				[action.key]: {
					isPending: false,
					errors: action.payload.cause,
					data: null
				}
			}

		default:
			return state
	}
}