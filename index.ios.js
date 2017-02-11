import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as app from './src/reducers/app.js';
import App from './src/components/app.js';

const reducer = combineReducers(app);
const store = createStore(reducer);

class Root extends Component {
	render(){
		return(
			<Provider store={store}><App /></Provider>
		)
	}
}

AppRegistry.registerComponent('SessionNative', () => Root);