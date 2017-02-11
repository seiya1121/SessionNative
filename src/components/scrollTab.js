import React, { Component } from 'react';
import ReactBaseComponent from './reactBaseComponent';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Comments from './comments.js';
import Que from './que.js';
import Search from './search.js'

class ScrollTab extends ReactBaseComponent {
	constructor(props) {
		super(props);
	}

	render(){
		const { app, appActions } = this.props;
		return(
			<ScrollableTabView renderTabBar={() => <DefaultTabBar />}>
				<Comments app={app} appActions={appActions} tabLabel="Comments" />
				<Que app={app} appActions={appActions} tabLabel='Que' />
				<Search app={app} appActions={appActions} tabLabel='Search' />
			</ScrollableTabView>
		);
	}
}

ScrollTab.propTypes = {
	app: React.PropTypes.object,
	appActions: React.PropTypes.object,
};

export default ScrollTab;