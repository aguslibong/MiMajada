import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Image, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import Menu from './src/Frontend/screens/Menu';
import Diagnostico from './src/Frontend/screens/Diagnostico/Diagnostico';
import Capacitacion from './src/Frontend/screens/Capacitacion/Capacitacion';
import RevisionOvino from './src/Frontend/screens/RevisionOvino/RevisionOvino';
import RegistrarMajada from './src/Frontend/screens/Majada/RegistrarMajada';
import Majada from './src/Frontend/screens/Majada/Majada';
import ConsultarMajada from './src/Frontend/screens/Majada/ConsultarMajada';
import setupDatabase from './src/Backend/db/db-config';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Componente personalizado para el contenido del drawer
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./img/LogoMiMajada.jpg')} // Ajusta esta ruta a donde tengas tu imagen
          style={styles.drawerImage}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const App = () => {

  React.useEffect(() => {
    setupDatabase()
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="Menu">
        <Drawer.Screen 
          name="Menu" 
          component={Menu} 
          options={{
            headerRight: () => (
              <Text style={styles.headerTitle}>MI MAJADA</Text>
            ),
            headerStyle: {
              backgroundColor: '#000',  // Cambia este color por el que quieras para el fondo del header
            },
            headerTintColor: '#fff',  // Cambia el color de los textos/íconos del header
          }}
        />
        
        <Drawer.Screen
          name="Capacitacion"
          component={Capacitacion}
          options={{
            drawerItemStyle: { display: 'flex' },
            headerRight: () => (
              <Text style={styles.headerTitle}>MI MAJADA</Text>
            ),
            headerStyle: {
              backgroundColor: '#000',  // Cambia este color para la pantalla de Capacitación
            },
            headerTintColor: '#fff',
          }}
        />
        
        <Drawer.Screen
          name="Diagnostico"
          component={Diagnostico}
          options={{
            drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }}
        />
        
        <Drawer.Screen
          name="RevisionOvino"
          component={RevisionOvino}
          options={{
            drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }}
        />
        
        <Drawer.Screen
          name="Majada"
          component={Majada}
          options={{
            drawerItemStyle: { display: 'none' },
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  drawerImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  headerTitle: {
    marginRight: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Cambia este color si quieres que el texto del título también se ajuste
  }
});

export default App;
