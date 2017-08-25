import {FETCH_SUMMARY_PENDING, FETCH_SUMMARY_SUCCESS, FETCH_SUMMARY_ERROR} from "./types";


export function fetchMonth(month) {
	let monthString = month.getYear() + '-' + month.getMonth()

	return {
		'BAQEND': {
			types: [
				{ type: FETCH_SUMMARY_PENDING, monthString },
				{ type: FETCH_SUMMARY_SUCCESS, monthString },
				{ type: FETCH_SUMMARY_ERROR, monthString }
			],
			payload: db => db.modules.post('StatisticsService', {action: 'reports', date: monthString})
		}
	}
}