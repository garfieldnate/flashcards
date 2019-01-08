import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';
import DummyDeckSource from '../builtinData/DummyDeckSource.js';

export default class AddDecksScreen extends Component {
  static navigationOptions = {
    title: "Pick a deck"
  }
  constructor(props) {
    super(props);
    this.listViewDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.ID !== r2.ID });
    this.deckSource = new DummyDeckSource();
    this.state = {
      basic: true
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    // TODO: disable and style as disabled elements that are already in the user's study list
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.listViewDataSource.cloneWithRows(this.deckSource.getAvailableDecks())}
            renderRow={data =>
              <ListItem thumbnail
                        onPress={() => this.props.navigation.getParam('userData', undefined).addNewStudySource(data)}
                        >
                <Left>
                  {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
                  <Thumbnail square source={{ uri: data.thumbnail }}
                    style={{width: 49, height: 49}} />
                </Left>
                <Body>
                  <Text>{ data.name }</Text>
                </Body>
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
