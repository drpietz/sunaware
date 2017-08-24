import auth from './auth'
import reports from './reports'
import uvTimer from './uvTimer'

export function getPendingState() {
	return {
		isPending: true,
		errors: null
	}
}

export function getSuccessState() {
	return {
		isPending: false,
		errors: null
	}
}

export function getBaqendErrorState(action) {
	return {
		isPending: false,
		errors: action.payload.cause
	}
}

export function getErrorState(error) {
	return {
		isPending: false,
		errors: error
	}
}

export default { auth, reports, uvTimer }
