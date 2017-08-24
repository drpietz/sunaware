import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const middlewares = [
	createLogger(),
	thunk
]

export default middlewares
