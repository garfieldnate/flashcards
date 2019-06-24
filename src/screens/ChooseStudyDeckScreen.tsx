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
import { FlatList, StyleSheet } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import AddDeckButton from '../components/AddDeckButton';
import AddDeckNotice from '../components/AddDeckNotice';

// TODO: this type declaration is duplicated everywhere.
type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface IProps {
  navigation: Navigation;
}

@observer
export default class ChooseStudyDeckScreen extends Component<IProps> {
  public static navigationOptions = ({ navigation }) => {
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

  private static navigateToAddDeckScreen = (nav: Navigation) => {
    nav.navigate('AddDecks', {
      deckSource: nav.state.params.deckSource,
      userData: nav.state.params.userData,
    });
  };

  get studySources() {
    return this.props.navigation.getParam(
      'userData',
      'no user data present in navigation properties!'
    ).studySources;
  }

  get deckSource() {
    return this.props.navigation.getParam(
      'deckSource',
      'no deck source present in navigation properties!'
    );
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
        <FlatList
          data={Array.from(this.studySources).slice()}
          renderItem={this.renderItem}
          keyExtractor={this.identityKeyExtractor}
        />
      </Content>
    </Container>
  );

  public renderItem = (listItem) => {
    const deck = this.deckSource.getDeck(listItem.item);
    const navigateToStudyScreen = () =>
      this.props.navigation.navigate('Study', {
        deck,
        userData: this.props.navigation.state.params.userData,
      });
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
