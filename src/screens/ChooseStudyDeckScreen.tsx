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
import React, { Component } from 'react';
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

@observer
export default class ChooseStudyDeckScreen extends Component<IProps> {
  public static navigationOptions = ({
    navigation,
  }: {
    navigation: Navigation;
  }) => {
    const onPress = () =>
      ChooseStudyDeckScreen.navigateToAddDeckScreen(navigation);
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

  private static navigateToAddDeckScreen = (nav: Navigation): void => {
    nav.navigate(
      'AddDecks',
      asAddDecksScreenNavParams({
        deckSource: nav.state.params.deckSource,
        userData: nav.state.params.userData,
      })
    );
  };

  get studySources(): Set<string> {
    return this.props.navigation.state.params.userData.studySources;
  }

  get deckSource(): IDeckSource {
    return this.props.navigation.state.params.deckSource;
  }

  public render() {
    let contents: JSX.Element;
    if (this.studySources.size === 0) {
      contents = this.renderAddDeckNotice();
    } else {
      contents = this.renderDeckList();
    }

    return (
      <Container>
        <Content>{contents}</Content>
      </Container>
    );
  }

  public renderAddDeckNotice = () => {
    const onPress = () =>
      ChooseStudyDeckScreen.navigateToAddDeckScreen(this.props.navigation);
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.container}>
          <AddDeckNotice onPress={onPress} />
        </Content>
      </Container>
    );
  };

  public readonly identityKeyExtractor = (item: any) => item;
  public renderDeckList = () => (
    // disableRightSwipe
    // rightOpenValue={-75}
    // renderRightHiddenRow={data =>
    //   <Button full onPress={() => alert(data)}>
    //     <Icon active name="information-circle" />
    //   </Button>}
    <Container>
      <Content>
        <FlatList<string>
          data={Array.from(this.studySources).slice()}
          renderItem={this.renderItem}
          keyExtractor={this.identityKeyExtractor}
        />
      </Content>
    </Container>
  );

  public renderItem = (listItem: ListRenderItemInfo<string>) => {
    const deck = this.deckSource.getDeck(listItem.item);
    const navigateToStudyScreen = () =>
      this.props.navigation.navigate(
        'Study',
        asStudyScreenNavParams({
          deck,
          userData: this.props.navigation.state.params.userData,
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
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
