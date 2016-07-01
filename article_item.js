import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';

export default class ArticleItem extends React.Component {
  handleTap() {
    // SwitchBoard.presentNavigationViewController(this, this.props.show.href);
    console.log("HI")
  }

  render() {
    const article = this.props.article;
    const imageURL = article.thumbnail_image.cropped.url

    return (
    <TouchableNativeFeedback onPress={this.handleTap}>
      <View style={article_styles.article_row}>
          <Image style={article_styles.thumbnail} source={{uri: imageURL}}  />
          <View style={article_styles.rightContainer}>
            <Text style={article_styles.title}>{article.title}</Text>
          </View>
      </View>
    </TouchableNativeFeedback>
    );
  }
}

const article_styles = StyleSheet.create({
  article_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  thumbnail: {
    width: 120,
    height: 100,
    marginLeft:20
  },
   rightContainer: {
    flex: 1,
    padding: 20
  },
  title: {
    fontWeight: "bold"
  }
});