import {
	FETCH_OLD_REPORTS, RECEIVE_NEW_REPORTS,
	REPORT_SUBMIT_PENDING, REPORT_SUBMIT_SUCCESS, REPORT_SUBMIT_ERROR
} from './types'

export function submitReport(clouds, rain, temperature) {
	return {
		'BAQEND': {
			types: [
				REPORT_SUBMIT_PENDING,
				REPORT_SUBMIT_SUCCESS,
				REPORT_SUBMIT_ERROR
			],
			payload: db => {
				let info = new db.WeatherInfo({
					position: db.User.me.position,
					clouds,
					rain,
					temperature
				})

				let report = new db.UserReport({
					user: db.User.me,
					info
				})

				return report.insert()
			}
		}
	}
}

export function fetchExistingReports() {
	let minDate = new Date()
	minDate.setHours(minDate.getHours() - 1)

	return {
		'BAQEND': {
			type: FETCH_OLD_REPORTS,
			payload: db => db.UserReport.find().greaterThan('createdAt', minDate).descending('createdAt').descending('id').resultList()
		}
	}
}

export function subscribeToNewReports() {
	return {
		'BAQEND': {
			type: RECEIVE_NEW_REPORTS,
			payload: db => db.UserReport.find().greaterThan('createdAt', new Date().toISOString()).descending('createdAt').descending('id').resultStream()
		}
	}
}