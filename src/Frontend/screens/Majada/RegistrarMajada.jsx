import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const RegistrarMajada = () => {
  const [epocaDelAnio, setEpocaDelAnio] = useState('');
  const [estancia, setEstancia] = useState('');
  const [fechaDeRevision, setFechaDeRevision] = useState('');
  const [observacion, setObservacion] = useState('');
  
  const navigation = useNavigation();
  
  const handleRegistro = () => {
    // Lógica para registrar los datos y obtener el id de la majada para pasar por parametro
    const idMajada = 1;
    navigation.navigate('RevisionOvino', { idMajada });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Registrar Majada</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Época del Año</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa la época del año"
            value={epocaDelAnio}
            onChangeText={setEpocaDelAnio}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Estancia</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa la estancia"
            value={estancia}
            onChangeText={setEstancia}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Revisión</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa la fecha de revisión"
            value={fechaDeRevision}
            onChangeText={setFechaDeRevision}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Observación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa una observación"
            value={observacion}
            onChangeText={setObservacion}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text style={styles.buttonText}>Registrar Ovinos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrarMajada;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#45658C',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
