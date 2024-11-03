import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import controladorMajada from '../../../Backend/Controller/ControladorMajada.js';

const { width } = Dimensions.get('window');

const RegistrarMajada = ({ setAction, majadaModificar, fecthData, majadas }) => {
  const id = majadaModificar ? majadaModificar.id : null;
  const navigation = useNavigation();

  const initialValues = {
    epocaDelAnio: '',
    estancia: '',
    observacion: ''
  };

  const [epocaDelAnio, setEpocaDelAnio] = useState(majadaModificar ? majadaModificar.epocaDelAnio : initialValues.epocaDelAnio);
  const [estancia, setEstancia] = useState(majadaModificar ? majadaModificar.estancia : initialValues.estancia);
  const [observacion, setObservacion] = useState(majadaModificar ? majadaModificar.observacion : initialValues.observacion);

  const setValoresNull = useCallback(() => {
    setEpocaDelAnio(initialValues.epocaDelAnio);
    setEstancia(initialValues.estancia);
    setObservacion(initialValues.observacion);
  }, []);

  useEffect(() => {
    return () => {
      setValoresNull();
    };
  }, [setValoresNull]);

  useEffect(() => {
    if (!majadaModificar) {
      setValoresNull();
    } else {
      setEpocaDelAnio(majadaModificar.epocaDelAnio);
      setEstancia(majadaModificar.estancia);
      setObservacion(majadaModificar.observacion);
    }
  }, [majadaModificar, setValoresNull]);

  const handleConsultar = () => {
    setValoresNull();
    //fecthData();
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
      console.log(epocaDelAnio)
      const idMajada = await controladorMajada.registrarMajada(epocaDelAnio, estancia, observacion);
      console.log("ID DE LA MAJADA CREADA: " + idMajada);
      navigation.navigate('RevisionOvino', { idMajada ,  actionInicial: 'R' });
      setValoresNull();
    } catch (error) {
      console.log("Error al registrar la majada:", error);
    }
  };

  const handleActualizar = async () => {
    if (!validarFormulario()) return;
    try {
      await controladorMajada.modificarMajada(id, epocaDelAnio, estancia, observacion);
      console.log("Majada actualizada con éxito");
      navigation.navigate('RevisionOvino', { id ,  actionInicial: 'C'});
      setValoresNull();
    } catch (error) {
      console.log("Error al actualizar la majada:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Picker.Item label="Otro" value="4" />
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
