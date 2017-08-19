import React from 'react'
import GuardedRoute from "../GuardedRoute/GuardedRoute";

function GuardedRouteGroup({active, redirect, children}) {
	return (
		<div>
			{children.map(child => (
				(child.type === GuardedRoute) ?
					React.cloneElement(child, {active, defaultRedirect: redirect, key: child.props.path})
					:
					child
			))}
		</div>
	)
}

export default GuardedRouteGroup
