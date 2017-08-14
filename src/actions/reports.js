import { REPORT_SUBMIT, FETCH_REPORTS } from './types'

export function submitReport(clouds, rain, temparature) {
	return {
		'BAQEND': {
			type: REPORT_SUBMIT,
			payload: db => {
				let info = new db.WeatherInfo({
					position: db.User.me.position,
					clouds,
					rain,
					temparature
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

export function fetchReports() {
	return {
		'BAQEND': {
			type: FETCH_REPORTS,
			payload: db => db.UserReport.find().limit(200).resultList()
		}
	}
}