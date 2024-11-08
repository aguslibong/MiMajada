import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Menu from './src/Frontend/screens/Menu';
import Diagnostico from './src/Frontend/screens/Diagnostico/Diagnostico';
import Capacitacion from './src/Frontend/screens/Capacitacion/Capacitacion';
import RevisionOvino from './src/Frontend/screens/RevisionOvino/RevisionOvino';
import RegistrarMajada from './src/Frontend/screens/Majada/RegistrarMajada'
import Majada from './src/Frontend/screens/Majada/Majada';
import ConsultarMajada from './src/Frontend/screens/Majada/ConsultarMajada';
import setupDatabase from './src/Backend/db/db-config';
import NavigationConsultarMajada from './src/Frontend/screens/Navigation/NavigationConsultarMajada'
import NavigationRegistroMajada from './src/Frontend/screens/Navigation/NavigationRegistroMajada'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();



// Primero, crea un componente personalizado para el contenido del drawer
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
  }, []
  )

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="Menu">
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen
          name="NavigationConsultarMajada"
          component={NavigationConsultarMajada}
          options={{
            drawerItemStyle: { display: 'flex' }
          }}
        />
        <Drawer.Screen
          name="NavigationRegistroMajada"
          component={NavigationRegistroMajada}
          options={{
            drawerItemStyle: { display: 'flex' }
          }}
        />
        <Drawer.Screen
          name="Capacitacion"
          component={Capacitacion}
          options={{
            drawerItemStyle: { display: 'flex' }
          }}
        />
        
        
        <Drawer.Screen
          name="Diagnostico"
          component={Diagnostico}
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="RevisionOvino"
          component={RevisionOvino}
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="Majada"
          component={Majada}
          options={{
            drawerItemStyle: { display: 'none' }
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
    backgroundColor: '#fff', // Puedes cambiar el color de fondo
  },
  drawerImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain', // o 'cover' dependiendo de cómo quieras que se ajuste la imagen
  }
});

export default App;