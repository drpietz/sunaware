import './App.css'
import React, { Component } from 'react'

import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'

import SunawareLayout from './components/SunawareLayout/SunawareLayout'
import Account from './components/Account/Account'
import MakeEntry from './components/MakeEntry/MakeEntry'
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage'
import Start from './components/Start/Start'


class App extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<BrowserRouter>
					<div className="App">
						<SunawareLayout>
							<Switch>
								<Route exact path="/" component={WelcomeMessage}/>
								<Route path="/account" component={Account}/>
								<Route exact path="/start" component={Start}/>
								<Route path="/start/entry" component={MakeEntry}/>
							</Switch>
						</SunawareLayout>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
