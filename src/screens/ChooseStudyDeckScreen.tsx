import { observer } from 'mobx-react';
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
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import AddDeckButton from '../components/AddDeckButton';
import AddDeckNotice from '../components/AddDeckNotice';
import IDeckSource from '../model/DeckSource';
import DummyUserData from '../userData/DummyUserData';

import { NavParams as AddDecksScreenNavParams } from './AddDecksScreen';
const asAddDecksScreenNavParams = (params: AddDecksScreenNavParams) => params;
import { NavParams as StudyScreenNavParams } from './StudyScreen';
const asStudyScreenNavParams = (params: StudyScreenNavParams) => params;
export type NavParams = { userData: DummyUserData; deckSource: IDeckSource };
// TODO: this type declaration is duplicated everywhere.
type Navigation = NavigationScreenProp<NavigationState, NavParams>;

interface IProps {
  navigation: Navigation;
}

const ChooseStudyDeckScreen = observer((props: IProps) => {
  const userData = props.navigation.state.params.userData;
  const deckSource = props.navigation.state.params.deckSource;

  const identityKeyExtractor = (item: any) => item;
  const renderDeckList = () => (
    // disableRightSwipe
    // rightOpenValue={-75}
    // renderRightHiddenRow={data =>
    //   <Button full onPress={() => alert(data)}>
    //     <Icon active name="information-circle" />
    //   </Button>}
    <Container>
      <Content>
        <FlatList<string>
          data={Array.from(userData.studySources).slice()}
          renderItem={renderItem}
          keyExtractor={identityKeyExtractor}
        />
      </Content>
    </Container>
  );

  const renderItem = (listItem: ListRenderItemInfo<string>) => {
    const deck = deckSource.getDeck(listItem.item);
    const navigateToStudyScreen = () =>
      props.navigation.navigate(
        'Study',
        asStudyScreenNavParams({
          deck,
          userData,
        })
      );
    return (
      <ListItem thumbnail onPress={navigateToStudyScreen}>
        <Left>
          {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
          <Thumbnail
            square
            source={{ uri: deck.thumbnail }}
            style={{ width: 49, height: 49 }}
          />
        </Left>
        <Body>
          <Text>{deck.name}</Text>
        </Body>
        <Right>
          <Text>{deck.cardsDue}</Text>
        </Right>
      </ListItem>
    );
  };

  const renderAddDeckNotice = () => {
    const onPress = () => navigateToAddDeckScreen(props.navigation);
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.container}>
          <AddDeckNotice onPress={onPress} />
        </Content>
      </Container>
    );
  };

  let contents: JSX.Element;
  if (userData.studySources.size === 0) {
    contents = renderAddDeckNotice();
  } else {
    contents = renderDeckList();
  }

  return (
    <Container>
      <Content>{contents}</Content>
    </Container>
  );
});

const navigateToAddDeckScreen = (nav: Navigation): void => {
  nav.navigate(
    'AddDecks',
    asAddDecksScreenNavParams({
      deckSource: nav.state.params.deckSource,
      userData: nav.state.params.userData,
    })
  );
};

ChooseStudyDeckScreen.navigationOptions = ({
  navigation,
}: {
  navigation: Navigation;
}) => {
  const onPress = () => navigateToAddDeckScreen(navigation);
  return {
    headerRight: (
      <AddDeckButton
        onPress={onPress}
        iconStyle={{ color: '#D1DCE9', fontSize: 28 }}
      />
    ),
    title: 'Pick a deck',
  };
};
export default ChooseStudyDeckScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
