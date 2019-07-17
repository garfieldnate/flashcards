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
import { IGlobalAppData } from '../globals/IGlobalAppData';
import { IDeckInfo } from '../model/DeckInfo';

const AddDecksScreen = () => {
  const globals: IGlobalAppData = useContext(AppGlobalsContext);

  const renderDeck = ({ item }: { item: IDeckInfo }) => {
    const addNewStudySource = () =>
      globals.userData.addNewStudySource(item.getId());
    const makeDeckElement = () => (
      <ListItem
        thumbnail
        onPress={addNewStudySource}
        disabled={globals.userData.studySources.has(item.getId())}
      >
        <Left>
          <Thumbnail
            square
            source={item.getThumbnail()}
            style={{ width: 49, height: 49 }}
          />
        </Left>
        <Body>
          <Text>{item.getName()}</Text>
        </Body>
        {globals.userData.studySources.has(item.getId()) ? (
          <Right>
            <Text>Added!</Text>
          </Right>
        ) : null}
      </ListItem>
    );

    return <Observer>{makeDeckElement}</Observer>;
  };

  const keyExtractor: (item: IDeckInfo, index: number) => string = (item) =>
    item.getId();
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
