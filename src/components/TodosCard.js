import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodosCard = ({item, navigation}) => {
  const [bgColor, setBgColor] = useState(null);
  const [complete, setComplete] = useState(false);

  const colorGenerator = () => {
    setBgColor(
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
    );
  };

  useEffect(() => {
    colorGenerator();
    if (new Date().getTime() > new Date(item.fitime).getTime()) {
      setComplete(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.task__container}>
        <View style={[styles.date__tag, {backgroundColor: bgColor}]}>
          <Text style={styles.date__tag__text}>
            {new Date(item.intime).getHours() % 12
              ? new Date(item.intime).getHours() % 12
              : '12'}
            {' : '}
            {new Date(item.intime).getMinutes()}{' '}
            {new Date(item.intime).getHours() >= 12 ? 'PM' : 'AM'} {' to '}
            {new Date(item.fitime).getHours() % 12
              ? new Date(item.fitime).getHours() % 12
              : '12'}
            {' : '}
            {new Date(item.fitime).getMinutes()}{' '}
            {new Date(item.fitime).getHours() >= 12 ? 'PM' : 'AM'}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <View style={styles.icon__container}>
          <Icon name="tasks" size={25} color="#b2bec3" />
        </View>
        <TouchableOpacity
          style={styles.body__container}
          onPress={() => {
            navigation.navigate('Edit', {detail: item});
          }}>
          <Text
            style={{color: '#FFFFFF', alignSelf: 'flex-start', fontSize: 20}}>
            {item.task}
          </Text>
          <Text style={styles.description__text}>{item.description}</Text>
        </TouchableOpacity>
        <View style={styles.button__container}>
          <CheckBox
            checked={complete}
            onPress={() => {
              setComplete(!complete);
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default TodosCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  date__tag: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  task__heading: {
    color: '#FFF',
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '400',
  },
  task__container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  date__tag__text: {
    fontSize: 15,
    fontWeight: '700',
    padding: 5,
  },
  icon__container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
    padding: 10,
  },
  body__container: {
    alignItems: 'center',
    flex: 0.6,
  },
  button__container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
  },
  description__text: {
    color: '#b2bec3',
    paddingLeft: 2,
    alignSelf: 'flex-start',
    marginTop: 3,
    fontSize: 14,
  },
});
