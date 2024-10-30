import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import controladorMajada from '../../../Backend/Controller/ControladorMajada.js';

const { width } = Dimensions.get('window');

const RegistrarMajada = ({ setAction, majadaModificar, onFinalizar, onObservacion, fetchData, majadas }) => {
  const [estancia, setEstancia] = useState('');
  const [epocaDelAnio, setEpocaDelAnio] = useState('');
  const [observacion, setObservacion] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (majadaModificar) {
      setEstancia(majadaModificar.estancia || '');
      setEpocaDelAnio(majadaModificar.epocaDelAnio || '');
      setObservacion(majadaModificar.observacion || '');
    }
  }, [majadaModificar]);

  const handleRegistro = async () => {
    if (!estancia || !epocaDelAnio) {
      Alert.alert('Error', 'Debes completar todos los campos.');
      return;
    }

    try {
      const idMajada = await controladorMajada.registrarMajada(estancia, epocaDelAnio, observacion);
      console.log("ID DE LA MAJADA CREADA : " + idMajada);
      fetchData();
      navigation.navigate('RevisionOvino', { idMajada });
    } catch (error) {
      console.error('Error al registrar la majada:', error);
      Alert.alert('Error', 'Hubo un problema al registrar la majada.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{majadaModificar ? "Modificar Majada" : "Registrar Majada"}</Text>
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
          <Text style={styles.label}>Época del Año</Text>
          <Picker
            selectedValue={epocaDelAnio}
            style={styles.picker}
            onValueChange={(itemValue) => setEpocaDelAnio(itemValue)}
          >
            <Picker.Item label="Seleccione la época del año" value="" />
            <Picker.Item label="PreServicio" value="PreServicio" />
            <Picker.Item label="PreParto" value="PreParto" />
            <Picker.Item label="PostParto" value="PostParto" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
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
          { majadaModificar !== null && (
              <TouchableOpacity style={styles.button} onPress={() => setAction('C')}>
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
            )}
          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text style={styles.buttonText}>{majadaModificar ? "Consultar Revision Ovinos" : "Registrar Reviciones Ovinos"}</Text>
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
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
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
