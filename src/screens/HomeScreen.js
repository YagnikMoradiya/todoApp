import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Card, Fab, Icon, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Header from '../components/Header';
import TodosCard from '../components/TodosCard';

const HomeScreen = ({navigation}) => {
  const [todoList, setTodoList] = useState([]);

  const isFocused = useIsFocused();

  const getTodoList = async () => {
    const storedValue = await AsyncStorage.getItem('@todo_list');
    if (!storedValue) {
      setTodoList([]);
    }
    const todos = JSON.parse(storedValue);
    setTodoList(todos);
  };

  const deleteTask = async () => {
    try {
      if (new Date().getDate() > new Date(todoList[0].date).getDate()) {
        await AsyncStorage.removeItem('@todo_list');
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoList();
    deleteTask();
  }, [isFocused]);

  if (todoList == null) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#000000',
        }}>
        <Text style={styles.notfound__text}>No Task Found!!</Text>
        <Text style={styles.notfound__text}>Add Today's Task.</Text>
        <Fab
          position="bottomRight"
          style={{backgroundColor: '#a29bfe'}}
          onPress={() => navigation.navigate('Add')}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../back.jpg')}
      style={styles.background__image}>
      <View style={styles.container}>
        <Header />
        <Card style={styles.todo__container}>
          <View style={styles.header__container}>
            <Text style={styles.header__text}>TODAYS TASK</Text>
            <Text style={styles.date__text}>{new Date().toDateString()}</Text>
          </View>
          <FlatList
            data={todoList}
            renderItem={({item}) => {
              return <TodosCard item={item} navigation={navigation} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </Card>
        <View style={{flex: 0.1}}></View>
        <Fab
          position="bottomRight"
          style={{backgroundColor: '#a29bfe'}}
          onPress={() => navigation.navigate('Add')}>
          <Icon name="add" />
        </Fab>
      </View>
    </ImageBackground>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  background__image: {
    flex: 1,
    width: null,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 15,
  },
  header__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header__text: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 20,
  },
  todo__container: {
    flex: 0.9,
    backgroundColor: '#353b48',
    borderRadius: 20,
    borderColor: '#000000',
    marginBottom: 25,
  },
  date__text: {
    color: '#b2bec3',
    fontSize: 14,
    paddingRight: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  notfound__text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
