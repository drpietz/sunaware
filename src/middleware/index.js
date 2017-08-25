import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

export const metaMiddlewares = [
	thunk
]

export const middlewares = [
	createLogger()
]
