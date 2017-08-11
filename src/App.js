import './App.css'
import React, { Component } from 'react'

import { Route, Switch } from 'react-router'
import { BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './store/store'
import { Link } from 'react-router-dom'

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
						<div className="hero is-fullheight bg-img">
							<nav className="breadcrumb is-right is-small" aria-label="breadcrumbs">
								<ul>
									<li><Link to="/account">Login</Link></li>
									<li><Link to="/start">Sign up</Link></li>
									<li><a href="#">About us</a></li>
								</ul>
							</nav>
						</div>J
						<div className="App">
							<Switch>
								<Route exact path="/" component={Introduction}/>
								<Route path="/account" component={Account}/>
								<Route path="/start" component={Start}/>
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</Provider>

		)
	}
}

export default App
