import { Observer, observer } from 'mobx-react';
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
import React, { useContext } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import AddDeckButton from '../components/AddDeckButton';
import AddDeckNotice from '../components/AddDeckNotice';

import { AppGlobalsContext } from '../globals/GlobalsContext';
import { IGlobalAppData } from '../globals/IGlobalAppData';
import {
  INavStatelessComponent,
  useNavigation,
} from '../globals/NavigationUtils';
import StudyManager from '../logic/StudyManager';
import { NavParams as StudyScreenNavParams } from './StudyScreen';
const asStudyScreenNavParams = (params: StudyScreenNavParams) => params;

const ChooseStudyDeckScreen: INavStatelessComponent = observer(() => {
  const globals: IGlobalAppData = useContext(AppGlobalsContext);
  const navigation = useNavigation<{}>();

  const deckNameKeyExtractor = (s: StudyManager) => s.deck.getId();
  const renderDeckList = () => (
    // disableRightSwipe
    // rightOpenValue={-75}
    // renderRightHiddenRow={data =>
    //   <Button full onPress={() => alert(data)}>
    //     <Icon active name="information-circle" />
    //   </Button>}
    <Container>
      <Content>
        <FlatList<StudyManager>
          data={Array.from(globals.userData.getStudySources()).slice()}
          renderItem={renderItem}
          keyExtractor={deckNameKeyExtractor}
        />
      </Content>
    </Container>
  );

  const renderItem = (listItem: ListRenderItemInfo<StudyManager>) => {
    const studyManager = listItem.item;
    console.log(studyManager.deck.getId());
    const navigateToStudyScreen = () =>
      navigation.navigate(
        'Study',
        asStudyScreenNavParams({
          studyManager,
        })
      );
    const renderer = () => (
      <ListItem thumbnail onPress={navigateToStudyScreen}>
        <Left>
          {/*https://github.com/GeekyAnts/NativeBase/issues/2513*/}
          <Thumbnail
            square
            source={studyManager.deck.getThumbnail()}
            style={{ width: 49, height: 49 }}
          />
        </Left>
        <Body>
          <Text>{studyManager.deck.getName()}</Text>
        </Body>
        <Right>
          <Text>{studyManager.getNumDue().get()}</Text>
        </Right>
      </ListItem>
    );
    return <Observer>{renderer}</Observer>;
  };

  const renderAddDeckNotice = () => {
    const onPress = () => navigation.navigate('AddDecks');
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.container}>
          <AddDeckNotice onPress={onPress} />
        </Content>
      </Container>
    );
  };

  let contents: JSX.Element;
  if (globals.userData.getStudyDecks().size === 0) {
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

ChooseStudyDeckScreen.navigationOptions = ({
  navigation,
}: NavigationScreenProps) => {
  const onPress = () => navigation.navigate('AddDecks');
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
