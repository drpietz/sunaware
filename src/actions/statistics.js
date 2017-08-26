import {FETCH_SUMMARY_PENDING, FETCH_SUMMARY_SUCCESS, FETCH_SUMMARY_ERROR} from "./types";


export function fetchMonth(month) {
	let monthString = month.getUTCFullYear() + '-' + month.getMonth()

	return {
		'BAQEND': {
			types: [
				{ type: FETCH_SUMMARY_PENDING, key: monthString },
				{ type: FETCH_SUMMARY_SUCCESS, key: monthString },
				{ type: FETCH_SUMMARY_ERROR, key: monthString }
			],
			payload: db => db.modules.post('StatisticsService', {action: 'reports', date: monthString})
		}
	}
}