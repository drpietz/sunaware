import {
	SYNCHRONIZE_TIMER, SYNCHRONIZE_ALLOWANCE,
	TOGGLE_TIMER_PENDING, TOGGLE_TIMER_SUCCESS, TOGGLE_TIMER_ERROR
} from './types'

export function synchronizeTimer() {
	return {
		'BAQEND': {
			type: SYNCHRONIZE_TIMER,
			payload: db => db.Timer.find().equal('user', db.User.me).descending('start').limit(1).resultStream()
		}
	}
}

export function toggleTimer() {
	return {
		'BAQEND': {
			types: [
				TOGGLE_TIMER_PENDING,
				TOGGLE_TIMER_SUCCESS,
				TOGGLE_TIMER_ERROR
			],
			payload: db => {
				return db.Timer.find().equal('user', db.User.me).descending('start').singleResult(timer => {
					if (!timer || timer.end) {
						return new db.Timer().save();
					} else {
						timer.end = new Date();
						return timer.save();
					}
				})
			}
		}
	}
}

export function synchronizeAllowance() {
	return {
		'BAQEND': {
			type: SYNCHRONIZE_ALLOWANCE,
			payload: db => db.modules.post('UserService', {action: 'remainingAllowance'}).then(parseFloat)
		}
	}
}