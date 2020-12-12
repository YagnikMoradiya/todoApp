import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Card, Form, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditScreen = ({navigation, route}) => {
  const [id, setId] = useState('');
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [intime, setIntime] = useState(new Date());
  const [fitime, setFitime] = useState(new Date());
  const [time, setTime] = useState(intime);
  const [show, setShow] = useState(false);

  const updateTodos = async () => {
    try {
      if (task == '' || description == '') {
        return ToastAndroid.showWithGravity(
          'All fields are required.',
          3000,
          ToastAndroid.BOTTOM,
        );
      }

      const todo = {
        id,
        task,
        date: new Date(),
        description,
        intime,
        fitime,
      };

      const storedList = await AsyncStorage.getItem('@todo_list');
      const list = await JSON.parse(storedList);

      list.map((todos) => {
        if (todos.id == id) {
          todos.task = task;
          todos.description = description;
          todos.intime = intime;
          todos.fitime = fitime;
        }
        return todos;
      });

      await AsyncStorage.setItem('@todo_list', JSON.stringify(list));
      navigation.navigate('Home');

      setTask('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentTime = selectedDate || time;
    setShow(false);
    if (time == intime) {
      setIntime(currentTime);
    } else {
      setFitime(currentTime);
    }
  };

  useEffect(() => {
    const {detail} = route.params;
    const {id, task, description} = detail;

    setTask(task);
    setDescription(description);
    setId(id);
  }, []);

  return (
    <ImageBackground
      source={require('../back.jpg')}
      style={styles.background__image}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={{color: '#FFFFFF', fontSize: 30}}>ADD TASK</Text>
        <Card style={styles.card__container}>
          <Form>
            <Item rounded style={styles.input__styles}>
              <Input
                placeholder="Task"
                value={task}
                style={{color: '#ffffff', fontSize: 16}}
                onChangeText={(text) => {
                  setTask(text);
                }}
              />
            </Item>
            <Item rounded style={styles.input__styles}>
              <Input
                placeholder="Description"
                value={description}
                style={{color: '#ffffff', fontSize: 16}}
                onChangeText={(des) => {
                  setDescription(des);
                }}
              />
            </Item>
          </Form>
          <View style={styles.clock__container}>
            <Text style={{fontSize: 18, fontWeight: '500', color: '#FFFFFF'}}>
              FROM:
            </Text>
            <View style={styles.icon__container}>
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                  setTime(intime);
                }}>
                <Icon name="clockcircle" size={40} color="#b2bec3" />
              </TouchableOpacity>
              <Text style={{color: '#b2bec3', paddingLeft: 15}}>
                {new Date(intime).toTimeString()}
              </Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: '500', color: '#FFFFFF'}}>
              TO:
            </Text>
            <View style={styles.icon__container}>
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                  setTime(fitime);
                }}>
                <Icon name="clockcircle" size={40} color="#b2bec3" />
              </TouchableOpacity>
              <Text style={{color: '#b2bec3', paddingLeft: 15}}>
                {new Date(fitime).toTimeString()}
              </Text>
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode={'time'}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
          <Button
            rounded
            block
            style={styles.submit__button}
            onPress={updateTodos}>
            <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
              UPDATE
            </Text>
          </Button>
        </Card>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default EditScreen;

const styles = StyleSheet.create({
  background__image: {
    flex: 1,
    width: null,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card__container: {
    backgroundColor: '#353b48',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderColor: '#000000',
  },
  input__styles: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  icon__container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  clock__container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  submit__button: {
    backgroundColor: '#a29bfe',
  },
});
