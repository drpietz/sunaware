import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import createStore from './store/store'

import 'bulma/css/bulma.css';
import './index.css';
import 'font-awesome/css/font-awesome.css';


const store = createStore();

ReactDOM.render(
	<App store={store} />,
	document.getElementById('root')
);
