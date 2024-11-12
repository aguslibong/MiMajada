import * as React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
=======
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
>>>>>>> Agus

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
=======
      <Image
        source={require('../../../img/LOGO_INTA _B&N.jpeg')} // Ajusta esta ruta a donde tengas tu imagen
        style={styles.logo} // Aplica el estilo aquí
      />
>>>>>>> Agus
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Majada', { actionInicial: 'C' })}
      >
<<<<<<< HEAD
        <Text style={styles.buttonText}>Consultar Majadas</Text>
=======
        <Text style={styles.buttonText}>Mis majadas</Text>
>>>>>>> Agus
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Majada', { actionInicial: 'R' })}
      >
<<<<<<< HEAD
        <Text style={styles.buttonText}>Registrar Majada Nueva</Text>
=======
        <Text style={styles.buttonText}>Nueva majada</Text>
>>>>>>> Agus
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
<<<<<<< HEAD
=======
  logo: {
    width: 150, // Ajusta el ancho a tu preferencia
    height: 150, // Ajusta la altura a tu preferencia
    resizeMode: 'contain', // Esto mantiene la relación de aspecto de la imagen
    marginBottom: 50, // Opcional: espacio debajo de la imagen
  },
>>>>>>> Agus
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
<<<<<<< HEAD
    width: '80%', // Adjust the width as needed
=======
    width: '80%', // Ajusta el ancho según sea necesario
>>>>>>> Agus
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;
