import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Observer } from 'mobx-react/native';
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, ListItem, Text } from 'native-base';

export default class AddDecksScreen extends Component {
  static navigationOptions = {
    title: "Pick a deck"
  }

  get userData() {
    return this.props.navigation.getParam('userData', 'no user data present in navigation properties!');
  }

  get deckSource() {
    return this.props.navigation.getParam('deckSource', 'no deck source present in navigation properties!');
  }

  render() {
    return (
      <Container>
        <Content>
          <FlatList
            data={this.deckSource.getAvailableDecks()}
            keyExtractor={(item, index) => item.ID}
            renderItem={({item, index}) =>
              <Observer>{() =>
                <ListItem thumbnail
                          onPress={() => this.userData.addNewStudySource(item.ID)}
                          disabled={this.userData.studySources.has(item.ID)}
                          >
                  <Left>
                    {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
                    <Thumbnail square source={{ uri: item.thumbnail }}
                      style={{width: 49, height: 49}} />
                  </Left>
                  <Body>
                    <Text>{ item.name }</Text>
                  </Body>
                  {
                    this.userData.studySources.has(item.ID) ?
                      (<Right><Text>Added!</Text></Right>) :
                      null
                  }
                </ListItem>
              }</Observer>
            }
          />
        </Content>
      </Container>
    );
  }
}
