import './App.css'
import React, { Component } from 'react'

import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './store/store'

import SunawareLayout from './components/SunawareLayout/SunawareLayout'
import Account from './components/Account/Account'
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage'
import Start from './components/Start/Start'

const store = createStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<SunawareLayout>
							<Switch>
								<Route exact path="/" component={WelcomeMessage}/>
								<Route path="/account" component={Account}/>
								<Route path="/start" component={Start}/>
							</Switch>
						</SunawareLayout>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
