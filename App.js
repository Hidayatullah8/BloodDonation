
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import StackNavigator from './src/config/Navigation'
// import Login from './src/config/login'
import StackNavigator from './src/config/Navigation'
// import DrawerNavigator from './src/config/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Profile from './src/components/Profile'
import Home from './src/components/Home'
import Chatroom from './src/components/Chatroom'
import Chats from './src/components/Chats'

import RegistrationForm from './src/components/registrationForm'


import { PersistGate } from 'redux-persist/integration/react'
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  return (

    <Provider store={store}>
      {/* <PaperProvider theme={theme}> */}


        <PersistGate persistor={persistor}>
          <NavigationContainer >

            <StackNavigator />
            {/* <Profile /> */}
            <StatusBar />
            {/* <RootComponent /> */}
          </NavigationContainer>
        </PersistGate>
      {/* </PaperProvider> */}





    </Provider>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
