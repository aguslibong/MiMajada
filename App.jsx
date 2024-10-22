import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/Frontend/screens/Menu';
import RegistrarRevisionOvino from './src/Frontend/screens/RevisionOvino/RegistroRevisionOvino';
import ConsultarRevisionOvino from './src/Frontend/screens/RevisionOvino/ConsultarRevisionOvino';
import RevisionOvino from './src/Frontend/screens/RevisionOvino/RevisionOvino';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="RevisionOvino" component={RevisionOvino} />
        <Stack.Screen name="RegistrarRevisionOvino" component={RegistrarRevisionOvino} />
        <Stack.Screen name="ConsultarRevisionOvino" component={ConsultarRevisionOvino} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

