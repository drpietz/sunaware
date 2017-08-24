import React from 'react'
import {NavLink} from 'react-router-dom'

function NavItem(props) {
	let icon = props.icon ? <span className="icon is-small"><i className={"fa " + props.icon}/></span> : null;
	let label = <span>{props.label}</span>

	if (props.disabled) {
		return (
			<span className="nav-item">{icon} {label}</span>
		)
	} else {
		return (
			<NavLink className="nav-item"
					 activeClassName="is-active"
					 to={props.to}
					 onClick={props.onClick}>
				{icon} {label}
			</NavLink>
		)
	}
}

export default NavItem