import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../img/LOGO_INTA _B&N.jpeg')} // Ajusta esta ruta a donde tengas tu imagen
        style={styles.logo} // Aplica el estilo aquí
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Majada', { actionInicial: 'C' })}
      >
        <Text style={styles.buttonText}>Mis majadas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Majada', { actionInicial: 'R' })}
      >
        <Text style={styles.buttonText}>Nueva majada</Text>
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
  logo: {
    width: 150, // Ajusta el ancho a tu preferencia
    height: 150, // Ajusta la altura a tu preferencia
    resizeMode: 'contain', // Esto mantiene la relación de aspecto de la imagen
    marginBottom: 50, // Opcional: espacio debajo de la imagen
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%', // Ajusta el ancho según sea necesario
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;
