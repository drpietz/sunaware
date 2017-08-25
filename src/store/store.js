import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import { createEnhancers, baqendReducer } from 'redux-baqend'
import { metaMiddlewares, middlewares } from '../middleware'
import reducers from '../reducers'

import { db } from 'baqend/realtime'

export default (initialState = {}) => {
	const reducer = combineReducers({
		baqend: baqendReducer,
		...reducers
	})
	const metaMiddleware = applyMiddleware(
		...metaMiddlewares
	)
	const middleware = applyMiddleware(
		...middlewares
	)

	const dbInstance = db.connect('archaic-hobbit-96', true)
	const { baqendConnect, baqendMiddleware } = createEnhancers(dbInstance)

	return createStore(reducer, initialState, compose(
		baqendConnect,
		metaMiddleware,
		applyMiddleware(baqendMiddleware),
		middleware
	))
}