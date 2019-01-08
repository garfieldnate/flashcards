import React, { Component } from 'react';
import { ListView } from 'react-native';
import {observer} from "mobx-react";
import {computed} from "mobx";
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';
import DummyDeckSource from '../builtinData/DummyDeckSource.js';

@observer
export default class ChooseStudyDeckScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Pick a deck",
    headerRight: (
      <Button transparent
              onPress={() => navigation.navigate('AddDecks', {userData: navigation.state.params.userData})}>
        <Icon name="ios-add-circle-outline" />
      </Button>
    )
  });

  listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  deckSource = new DummyDeckSource();

  @computed get dataSource() {
    return this.listDataSource.cloneWithRows(this.props.navigation.getParam('userData', 'no user data present in navigation properties!').studySources.slice());
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.dataSource}
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
