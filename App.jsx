import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/Frontend/screens/Menu';
import RegistrarRevisionOvino from './src/Frontend/screens/RevisionOvino/RegistroRevisionOvino';
import ConsultarRevisionOvino from './src/Frontend/screens/RevisionOvino/ConsultarRevisionOvino';
import RevisionOvino from './src/Frontend/screens/RevisionOvino/RevisionOvino';
import RegistrarMajada from './src/Frontend/screens/Majada/RegistrarMajada'
import Majada from './src/Frontend/screens/Majada/Majada';
import ConsultarMajada from './src/Frontend/screens/Majada/ConsultarMajada';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="RevisionOvino" component={RevisionOvino} />
        <Stack.Screen name="RegistrarRevisionOvino" component={RegistrarRevisionOvino} />
        <Stack.Screen name="ConsultarRevisionOvino" component={ConsultarRevisionOvino} />
        <Stack.Screen name="Majada" component={Majada} />
        <Stack.Screen name="RegistrarMajada" component={RegistrarMajada} />
        <Stack.Screen name="ConsultarMajada" component={ConsultarMajada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

