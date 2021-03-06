import './App.css'
import React, { Component } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { fetchExistingReports, subscribeToNewReports } from "./actions/reports"
import { connect, Provider } from 'react-redux'

import Positioning from './page/user/Positioning/Positioning'
import SunawareLayout from './page/app/layout/SunawareLayout/SunawareLayout'
import WelcomeMessage from './page/app/info/WelcomePage/WelcomePage'
import Start from './page/weather/StartPage/StartPage'
import StatsPage from './page/user/StatsPage/StatsPage'
import Login from './page/user/LoginPage/LoginPage'
import SignUp from './page/user/SignUpPage/SignUpPage'
import Settings from "./page/user/SettingsPage/SettingsPage"
import GuardedRoute from './page/app/routing/GuardedRoute/GuardedRoute'
import GuardedRouteGroup from "./page/app/routing/GuardedRouteGroup/GuardedRouteGroup"
import LoadingPage from "./page/app/info/LoadingPage/LoadingPage";
import MakeEntry from "./page/weather/MakeEntry/MakeEntry";

import Notifications from 'react-notify-toast';


class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false
		}
	}

	componentDidMount() {
		this.props.actions.fetchExistingReports()
		this.props.actions.subscribeToNewReports()
	}

	render() {
		const loggedIn = this.props.isLoggedIn

		return (
			<Provider store={this.props.store}>
				<BrowserRouter>
					<SunawareLayout>
						<Notifications />

						{ !this.props.isConnected ?
							<LoadingPage />
							:
							<div>
								<GuardedRouteGroup active={loggedIn} redirect="/">
									<GuardedRoute path="/" component={Positioning} />

									<GuardedRoute exact path="/settings" component={Settings} />
									<GuardedRoute path="/start" component={Start}/>
									<GuardedRoute exact path="/start/entry" component={MakeEntry} />
									<GuardedRoute exact path="/stats" component={StatsPage} />
								</GuardedRouteGroup>

								<GuardedRouteGroup active={!loggedIn} redirect="/start">
									<GuardedRoute exact path="/" component={WelcomeMessage} />
									<GuardedRoute exact path="/login" component={Login} />
									<GuardedRoute exact path="/signup" redirect="/settings" component={SignUp} />
								</GuardedRouteGroup>
							</div>
						}
					</SunawareLayout>
				</BrowserRouter>
			</Provider>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		isConnected: state.baqend.connected
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchExistingReports, subscribeToNewReports }, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
