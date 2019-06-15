import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {observer} from "mobx-react";
import {computed} from "mobx";
import { Container, Content, Left, Body, Right, Thumbnail, Button, Icon, List, ListItem, Text, Row } from 'native-base';

import AddDeckNotice from '../components/AddDeckNotice.js';
import AddDeckButton from '../components/AddDeckButton.js';

@observer
export default class ChooseStudyDeckScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Pick a deck",
    headerRight: <AddDeckButton navigation={navigation} iconStyle={{color: "#D1DCE9", fontSize: 28}}/>
  });

  // listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
      <Content contentContainerStyle={styles.container}>
        <AddDeckNotice navigation={this.props.navigation}/>
      </Content>
    </Container>);


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
            keyExtractor={(item, index) => item}
          />
        </Content>
      </Container>);

  renderItem = (listItem) => {
    const deck = this.deckSource.getDeck(listItem.item);
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
    alignItems: 'center',
  }
});
