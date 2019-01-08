import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';
import DummyUserData from '../userData/DummyUserData.js';
import DummyDeckSource from '../builtinData/DummyDeckSource.js';

const userData = new DummyUserData();
export default class ChooseStudyDeckScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Pick a deck",
    headerRight: (
      <Button transparent
              onPress={() => navigation.navigate('AddDecks', {userData: userData})}>
        <Icon name="ios-add-circle-outline" />
      </Button>
    )
  });

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(userData.getStudySources())
    };
    this.willFocus = this.props.navigation.addListener('willFocus', payload => {
      console.log("firing willFocus");
      this.setState({dataSource: ds.cloneWithRows(userData.getStudySources())});
    });
    this.deckSource = new DummyDeckSource();
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    // TODO: if the list of decks is empty, render an "add decks" button instead
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.state.dataSource}
            renderRow={data =>
              <ListItem thumbnail onPress={() => this.props.navigation.navigate('Study', {deck: data})}>
                <Left>
                  {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
                  <Thumbnail square source={{ uri: data.thumbnail }}
                    style={{width: 49, height: 49}} />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                </Body>
                <Right>
                  <Text>{data.cardsDue}</Text>
                </Right>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}
