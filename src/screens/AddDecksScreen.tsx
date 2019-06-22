import { Observer } from 'mobx-react/native';
import { Body, Container, Content, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Deck } from '../model/Deck';
import IDeckSource from '../model/DeckSource';

type Navigation = NavigationScreenProp<NavigationState>;

interface IProps {
  navigation: Navigation,
}

export default class AddDecksScreen extends Component<IProps> {
  public static navigationOptions = {
    title: 'Pick a deck',
  };

  get userData() {
    return this.props.navigation.getParam(
      'userData', 'no user data present in navigation properties!');
  }

  public get deckSource(): IDeckSource {
    return this.props.navigation.getParam(
      'deckSource', 'no deck source present in navigation properties!');
  }

  public renderDeck = ({ item }: { item: Deck }) => {
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

  public render() {
    const keyExtractor: (item: Deck, index: number) => string = (item) => item.ID;

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
