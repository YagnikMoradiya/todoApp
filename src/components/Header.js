import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.font}>TODOS</Text>
      <Image source={require('../logo.png')} style={styles.logo} />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
  },
  font: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    height: 60,
    width: 60,
  },
});
