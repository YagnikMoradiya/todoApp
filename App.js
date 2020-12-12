import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddScreen from './src/screens/AddScreen';
import EditScreen from './src/screens/EditScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
