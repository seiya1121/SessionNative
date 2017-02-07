import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView } from 'react-native';
import { base, firebaseAuth } from './src/config/firebaseApp.js';
import { SyncStates } from './src/constants/app.js';

export default class SessionNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      que: [],
    };
  }

  componentDidMount(){
    base.fetch('que', { context: this, asArray: true, then(data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        que: data,
      });
    }});
  }

  render() {
    const queNode = this.state.que.map((item) => (
      <Text>{item.title}</Text>
    ));

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello World
        </Text>
        {queNode}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SessionNative', () => SessionNative);
