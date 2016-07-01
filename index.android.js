/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';
var Navigator = require('Navigator');
import ArticleItem from './article_item'

class editorial_android extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log("OK LOADDED")
  }

  fetchData() {
    var query = '{ articles(published: true) { id, title, href, thumbnail_image { cropped(width: 400, height: 380) { url } } author { name } } }'
    var staging_token = ''
    var staging_metaphysics = 'http://metaphysics-staging.artsy.net/'
    var request = staging_metaphysics + "?query=" + query
    fetch(request, {
      method: 'GET',
      headers: {
        'X-Xapp-Token': staging_token,
      }})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.articles),
          loaded: true,
        });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading articles...
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderArticle_new}
        style={styles.listView}
      />
    );
  }

  renderArticle_new(article) {
    return (
      <ArticleItem article={article} />
    );
  }


  renderArticle(article) {
    return (
      <TouchableHighlight onPress={this.onPress} >

        <View style={styles.article_row}>
          <Image style={styles.thumbnail} source={{uri: article.thumbnail_image.cropped.url}}  />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{article.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressButton(article){
      console.log("OK")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  article_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
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
  thumbnail: {
    width: 120,
    height: 100,
    marginLeft:20
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
   rightContainer: {
    flex: 1,
    padding: 20
  },
  title: {
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent('editorial_android', () => editorial_android);
