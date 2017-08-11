import './App.css'
import React, { Component } from 'react'
//import logo from './logo.svg'

import { Route, Switch } from 'react-router'
import { BrowserRouter, NavLink } from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './store/store'

import Account from './components/Account/Account'
import Introduction from './components/Introduction/Introduction'
import Start from './components/Start/Start'

const store = createStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<div style={{ backgroundColor: '#eee', padding: '16px' }}>
						<nav className="breadcrumb is-right is-small" aria-label="breadcrumbs">
							<ul>
								<li><NavLink  style={{ padding: '0 8px' }}
											  activeStyle={{ textDecoration: 'underline' }} to="/account"><span class="icon is-small"><i class="fa fa-home"></i></span><span>Account</span></NavLink></li>
								<li><NavLink to="/start">Map</NavLink></li>
								<li><a href="#">About us</a></li>
							</ul>
						</nav>
						</div>
						<Switch>
							<Route exact path="/" component={Introduction}/>
							<Route path="/account" component={Account}/>
							<Route path="/start" component={Start}/>
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
