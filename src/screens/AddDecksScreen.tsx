import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Observer } from 'mobx-react/native';
import { Container, Content, Left, Body, Right, Thumbnail, ListItem, Text } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Deck, DeckSource } from '../model/Types';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

type Props = {
  navigation: Navigation,
};

export default class AddDecksScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Pick a deck',
  };

  get userData() {
    return this.props.navigation.getParam(
      'userData', 'no user data present in navigation properties!');
  }

  get deckSource(): DeckSource {
    return this.props.navigation.getParam(
      'deckSource', 'no deck source present in navigation properties!');
  }

  renderDeck = ({ item }: { item: Deck }) => {
    const addNewStudySource = () => this.userData.addNewStudySource(item.ID);
    const makeDeckElement = () => (
      <ListItem
        thumbnail
        onPress={addNewStudySource}
        disabled={this.userData.studySources.has(item.ID)}
      >
        <Left>
          <Thumbnail
            square
            source={{ uri: item.thumbnail }}
            style={{ width: 49, height: 49 }}
          />
        </Left>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        {this.userData.studySources.has(item.ID) ? (<Right><Text>Added!</Text></Right>) : null}
      </ListItem>
    );
    return <Observer>{makeDeckElement}</Observer>;
  }

  render() {
    const keyExtractor: (item: Deck, index: number) => string = item => item.ID;
    return (
      <Container>
        <Content>
          <FlatList
            data={this.deckSource.getAvailableDecks()}
            keyExtractor={keyExtractor}
            renderItem={this.renderDeck}
          />
        </Content>
      </Container>
    );
  }
}
