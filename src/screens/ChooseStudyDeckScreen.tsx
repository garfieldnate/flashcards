import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Container, Content, Left, Body, Right, Thumbnail, ListItem, Text } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import AddDeckNotice from '../components/AddDeckNotice';
import AddDeckButton from '../components/AddDeckButton';

// TODO: this type declaration is duplicated everywhere.
type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

type Props = {
  navigation: Navigation,
};

@observer
export default class ChooseStudyDeckScreen extends Component<Props> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Pick a deck',
    headerRight: (
      <AddDeckButton
        navigation={navigation}
        iconStyle={{ color: '#D1DCE9', fontSize: 28 }}
      />
    ),
  })

  get studySources() {
    return this.props.navigation.getParam(
      'userData', 'no user data present in navigation properties!').studySources;
  }

  get deckSource() {
    return this.props.navigation.getParam(
      'deckSource', 'no deck source present in navigation properties!');
  }

  render() {
    let contents: JSX.Element;
    if (this.studySources.size === 0) {
      contents = this.renderAddDeckNotice();
    } else {
      contents = this.renderDeckList();
    }

    return (
      <Container>
        <Content>
          {contents}
        </Content>
      </Container>
    );
  }

  renderAddDeckNotice = () => (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.container}>
        <AddDeckNotice navigation={this.props.navigation} />
      </Content>
    </Container>
  )

  readonly identityKeyExtractor = item => item;
  renderDeckList = () => (
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
  )

  renderItem = (listItem) => {
    const deck = this.deckSource.getDeck(listItem.item);
    const navigateToStudyScreen = () => this.props.navigation.navigate(
      'Study', { deck, userData: this.props.navigation.state.params.userData });
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
