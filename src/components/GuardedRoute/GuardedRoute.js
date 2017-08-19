import React from 'react'
import {Redirect, Route} from 'react-router'

function GuardedRoute({component: Component, active, redirect, defaultRedirect, ...rest}) {
	return (
		<Route {...rest} render={props => (
			active ? (
				<Component {...props}/>
			) : (
				<Redirect to={redirect || defaultRedirect} />
			)
		)}/>
	)
}

export default GuardedRoute
