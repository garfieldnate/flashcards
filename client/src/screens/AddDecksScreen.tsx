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
import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { AppGlobalsContext } from '../globals/GlobalsContext';
import { IDeck } from '../model/Deck';

const AddDecksScreen = () => {
  const globals = useContext(AppGlobalsContext);

  const renderDeck = ({ item }: { item: IDeck }) => {
    const addNewStudySource = () => globals.userData.addNewStudySource(item.ID);
    const makeDeckElement = () => (
      <ListItem
        thumbnail
        onPress={addNewStudySource}
        disabled={globals.userData.studySources.has(item.ID)}
      >
        <Left>
          <Thumbnail
            square
            source={item.thumbnail}
            style={{ width: 49, height: 49 }}
          />
        </Left>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        {globals.userData.studySources.has(item.ID) ? (
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
          data={globals.deckProvider.getAvailableDecks()}
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
