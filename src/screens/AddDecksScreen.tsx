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
import React from 'react';
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

const AddDecksScreen = (props: IProps) => {
  const userData = props.navigation.state.params.userData;

  const deckSource = props.navigation.state.params.deckSource;

  const renderDeck = ({ item }: { item: IDeck }) => {
    const addNewStudySource = () => userData.addNewStudySource(item.ID);
    const makeDeckElement = () => (
      <ListItem
        thumbnail
        onPress={addNewStudySource}
        disabled={userData.studySources.has(item.ID)}
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
        {userData.studySources.has(item.ID) ? (
          <Right>
            <Text>Added!</Text>
          </Right>
        ) : null}
      </ListItem>
    );

    return <Observer>{makeDeckElement}</Observer>;
  };

  const keyExtractor: (item: IDeck, index: number) => string = (item) =>
    item.ID;
  return (
    <Container>
      <Content>
        <FlatList
          data={deckSource.getAvailableDecks()}
          keyExtractor={keyExtractor}
          renderItem={renderDeck}
        />
      </Content>
    </Container>
  );
};

AddDecksScreen.navigationOptions = {
  title: 'Pick a deck',
};

export default AddDecksScreen;
