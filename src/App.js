import './App.css'
import React, { Component } from 'react'

import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { fetchExistingReports, subscribeToNewReports } from "./actions/reports"
import { connect, Provider } from 'react-redux'

import SunawareLayout from './components/SunawareLayout/SunawareLayout'
import Account from './components/Account/Account'
import MakeEntry from './components/MakeEntry/MakeEntry'
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage'
import Start from './components/Start/Start'


class App extends Component {

	componentDidMount() {
		this.props.actions.fetchExistingReports()
		this.props.actions.subscribeToNewReports()
	}

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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchExistingReports, subscribeToNewReports }, dispatch)
	}
}

export default connect(null, mapDispatchToProps)(App)
