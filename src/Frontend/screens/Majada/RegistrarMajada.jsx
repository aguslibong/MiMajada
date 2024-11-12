import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import controladorMajada from '../../../Backend/Controller/ControladorMajada.js';

const { width } = Dimensions.get('window');

const RegistrarMajada = ({ setAction, majadaModificar, fecthData, majadas }) => {
 
<<<<<<< HEAD
  const id = majadaModificar ? majadaModificar.id : null;
=======
  const id = majadaModificar ? majadaModificar.idMajada : null;
>>>>>>> Agus
  const navigation = useNavigation();

  const initialValues = {
    epocaDelAnio: '',
    estancia: '',
    observacion: ''
  };

  const [epocaDelAnio, setEpocaDelAnio] = useState(initialValues.epocaDelAnio);
  const [estancia, setEstancia] = useState(initialValues.estancia);
  const [observacion, setObservacion] = useState(initialValues.observacion);

  const setValoresNull = useCallback(() => {
    setEpocaDelAnio(initialValues.epocaDelAnio);
    setEstancia(initialValues.estancia);
    setObservacion(initialValues.observacion);
  }, []);

  useEffect(() => {
    if (majadaModificar) {
      setEpocaDelAnio(String(majadaModificar.epocaDelAño.idEpocaDelAño));
      setEstancia(majadaModificar.estancia);
      setObservacion(majadaModificar.observacion);
    } else {
      setValoresNull();
    }
  }, [majadaModificar, setValoresNull]);

  const handleConsultar = () => {
    setValoresNull();
    setAction('C');
  };

  const validarFormulario = () => {
    if (epocaDelAnio === '') {
      Alert.alert('Error', 'Debe seleccionar la época del año.');
      return false;
    }
    if (estancia === '') {
      Alert.alert('Error', 'Debe ingresar la estancia.');
      return false;
    }
    return true;
  };

  const handleRegistro = async () => {
    if (!validarFormulario()) return;
    try {
      const idMajada = await controladorMajada.registrarMajada(epocaDelAnio, estancia, observacion);
      console.log("ID DE LA MAJADA CREADA: " + idMajada);
      navigation.navigate('RevisionOvino', { idMajada, actionInicial: 'R' });
      setValoresNull();
    } catch (error) {
      console.log("Error al registrar la majada:", error);
    }
  };

  const handleActualizar = async () => {
    if (!validarFormulario()) return;
    try {
      await controladorMajada.modificarMajada(id, epocaDelAnio, estancia, observacion);
      console.log("Majada actualizada con éxito con el id: " + id);
      const idMajada = id;
      navigation.navigate('RevisionOvino', { idMajada, actionInicial: 'C' });
      setValoresNull();
    } catch (error) {
      console.log("Error al actualizar la majada:", error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{majadaModificar === null ? 'Registrar Majada' : 'Modificar Majada'}</Text>
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
          <Text style={styles.label}>Epoca del Año</Text>
          <Picker
            selectedValue={epocaDelAnio}
            style={styles.picker}
            onValueChange={(itemValue) => setEpocaDelAnio(itemValue)}>
            <Picker.Item label="Seleccione la época del año" value="" />
            <Picker.Item label="PreServicio" value="1" />
            <Picker.Item label="PreParto" value="2" />
            <Picker.Item label="PostParto" value="3" />
<<<<<<< HEAD
            <Picker.Item label="Otro" value="4" />
=======
>>>>>>> Agus
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
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={majadaModificar ? handleConsultar : () => navigation.navigate('Menu')}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          {majadaModificar === null && (
            <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegistro}>
              <Text style={styles.buttonText}>Registrar Ovinos</Text>
            </TouchableOpacity>
          )}
          {majadaModificar !== null && (
            <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleActualizar}>
              <Text style={styles.buttonText}>Actualizar Majada</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  );
};

export default RegistrarMajada;

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  slider: {
    width: '100%',
  },
  sliderValue: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  tabsContainer: {
    marginBottom: 10,
  },
  tabStyle: {
    borderColor: '#ccc',
  },
  activeTabStyle: {
    backgroundColor: '#45658C',
  },
  tabTextStyle: {
    color: '#000',
  },
  activeTabTextStyle: {
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  updateButton: {
    backgroundColor: '#2196F3',
  },
});