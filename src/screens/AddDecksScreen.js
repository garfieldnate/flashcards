import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Left, Body, Right,  Thumbnail, Button, Icon, List, ListItem, Text } from 'native-base';
const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];
export default class AddDecksScreen extends Component {
  static navigationOptions = {
    title: "Pick a deck"
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // TODO: if the list of decks is empty, render an "add decks" button instead
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem thumbnail onPress={() => this.props.navigation.navigate('Study')}>
                <Left>
                  {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
                  <Thumbnail square source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png' }}
                    style={{width: 49, height: 49}} />
                </Left>
                <Body>
                  <Text>Deck Name Here</Text>
                </Body>
                <Right>
                  <Text>100</Text>
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
