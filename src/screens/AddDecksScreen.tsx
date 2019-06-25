import { Observer } from 'mobx-react';
import {
  Body,
  Container,
  Content,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { IDeck } from '../model/Deck';
import IDeckSource from '../model/DeckSource';
import DummyUserData from '../userData/DummyUserData';

export type NavParams = { userData: DummyUserData; deckSource: IDeckSource };

type Navigation = NavigationScreenProp<NavigationState, NavParams>;

interface IProps {
  navigation: Navigation;
}

export default class AddDecksScreen extends Component<IProps> {
  public static navigationOptions = {
    title: 'Pick a deck',
  };

  get userData() {
    return this.props.navigation.state.params.userData;
  }

  public get deckSource() {
    return this.props.navigation.state.params.deckSource;
  }

  public renderDeck = ({ item }: { item: IDeck }) => {
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
        {this.userData.studySources.has(item.ID) ? (
          <Right>
            <Text>Added!</Text>
          </Right>
        ) : null}
      </ListItem>
    );

    return <Observer>{makeDeckElement}</Observer>;
  };

  public render() {
    const keyExtractor: (item: IDeck, index: number) => string = (item) =>
      item.ID;

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
