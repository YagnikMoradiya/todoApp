import React, {useState} from 'react';
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
import shortid from 'shortid';

const AddScreen = ({navigation}) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [intime, setIntime] = useState(new Date());
  const [fitime, setFitime] = useState(new Date());
  const [time, setTime] = useState(intime);
  const [show, setShow] = useState(false);

  const saveTodos = async () => {
    try {
      if (task == '' || description == '') {
        return ToastAndroid.showWithGravity(
          'All fields are required.',
          3000,
          ToastAndroid.BOTTOM,
        );
      }

      const todo = {
        id: shortid.generate(),
        date: new Date(),
        task,
        description,
        intime,
        fitime,
      };

      const storedList = await AsyncStorage.getItem('@todo_list');
      const prevList = await JSON.parse(storedList);

      if (!prevList) {
        const newList = [todo];
        await AsyncStorage.setItem('@todo_list', JSON.stringify(newList));
      } else {
        prevList.push(todo);
        await AsyncStorage.setItem('@todo_list', JSON.stringify(prevList));
      }
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

  return (
    <ImageBackground
      source={require('../back.jpg')}
      style={styles.background__image}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>
          ADD TASK
        </Text>
        <Card style={styles.card__container}>
          <Form>
            <Item rounded style={styles.input__styles}>
              <Input
                placeholder="Task"
                style={{color: '#ffffff', fontSize: 16}}
                onChangeText={(text) => {
                  setTask(text);
                }}
              />
            </Item>
            <Item rounded style={styles.input__styles}>
              <Input
                placeholder="Description"
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
            onPress={saveTodos}>
            <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>
              ADD
            </Text>
          </Button>
        </Card>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default AddScreen;

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
