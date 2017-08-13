import { REPORT_SUBMIT } from './types'

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