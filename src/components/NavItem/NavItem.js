import React from 'react'
import {NavLink} from 'react-router-dom'

function NavItem(props) {
	return (
		<NavLink className="nav-item"
				 activeClassName="is-active"
				 {...props.link}>
			{props.icon ? <span className="icon is-small"><i className={"fa " + props.icon}/></span> : null}
			<span>{props.label}</span>
		</NavLink>
	)
}

export default NavItem