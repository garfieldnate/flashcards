import React, { Component } from 'react';
import { ListView, StyleSheet } from 'react-native';
import {observer} from "mobx-react";
import {computed} from "mobx";
import { Container, Content, Left, Body, Right, Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';

@observer
export default class ChooseStudyDeckScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Pick a deck",
    headerRight: (
      <Button transparent
              onPress={() => navigation.navigate('AddDecks',
                {
                  userData:   navigation.state.params.userData,
                  deckSource: navigation.state.params.deckSource
                })}>
        <Icon name="ios-add-circle-outline" />
      </Button>
    )
  });

  listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  get studySources() {
    return this.props.navigation.getParam('userData', 'no user data present in navigation properties!').studySources;
  }

  get deckSource() {
    return this.props.navigation.getParam('deckSource', 'no deck source present in navigation properties!');
  }

  render() {
    var contents;
    if(this.studySources.size === 0) {
      contents = this.renderAddDeckNotice(this.props.navigation);
    } else {
      contents = this.renderDeckList();
    }

    return (
      <Container>
        <Content>
          {contents}
        </Content>
      </Container>);
  }

  renderAddDeckNotice = (navigation) => (
    <Container style={styles.container}>
      <Content>
        <Body>
          <Text>Click on</Text>
          {ChooseStudyDeckScreen.navigationOptions({ navigation }).headerRight}
          <Text>to add a deck</Text>
        </Body>
      </Content>
    </Container>);


  renderDeckList = () => (
      <Container>
        <Content>
          <List
            disableRightSwipe
            rightOpenValue={-75}
            dataSource={this.listDataSource.cloneWithRows(Array.from(this.studySources).slice())}
            renderRow={this.renderRow}
            renderRightHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
          />
        </Content>
      </Container>);

  renderRow = (deckID) => {
    const deck = this.deckSource.getDeck(deckID);
    return (
      <ListItem thumbnail onPress={() => this.props.navigation.navigate('Study', {deck: deck, userData: this.props.navigation.state.params.userData})}>
        <Left>
          {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
          <Thumbnail square source={{ uri: deck.thumbnail }}
            style={{width: 49, height: 49}} />
        </Left>
        <Body>
          <Text>{deck.name}</Text>
        </Body>
        <Right>
          <Text>{deck.cardsDue}</Text>
        </Right>
      </ListItem>);
  };
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
