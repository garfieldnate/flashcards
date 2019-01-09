import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';
import DummyDeckSource from '../builtinData/DummyDeckSource.js';

export default class AddDecksScreen extends Component {
  static navigationOptions = {
    title: "Pick a deck"
  }

  deckSource = new DummyDeckSource();

  render() {
    const userData = this.props.navigation.getParam('userData', 'userData parameter missing from navigation properties!');
    // TODO: disable and style as disabled elements that are already in the user's study list
    // const userData =
    return (
      <Container>
        <Content>
          <List
            dataArray={this.deckSource.getAvailableDecks()}
            renderRow={data =>
              <ListItem thumbnail
                        onPress={() => userData.addNewStudySource(data.ID)}
                        // disabled={userData.studySources.includes(data)}
                        >
                <Left>
                  {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
                  <Thumbnail square source={{ uri: data.thumbnail }}
                    style={{width: 49, height: 49}} />
                </Left>
                <Body>
                  <Text>{ data.name }</Text>
                </Body>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}
