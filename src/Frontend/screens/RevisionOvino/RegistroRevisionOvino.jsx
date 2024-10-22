import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino';
import { EnfermedadSingleton } from '../../../Backend/service/Singleton/RevisionOvino/EnfermedadSingleton.service';
import { SexoSingleton } from '../../../Backend/service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../../../Backend/service/Singleton/RevisionOvino/CondicionBucalSingleton.service';

const { width } = Dimensions.get('window');

const RegistrarRevisionOvino = ({ setAction, revisionModificar, OnFinalizar, OnObservacion }) => {
  const id = (revisionModificar) ? revisionModificar.id : null; // Obtenemos el ID de la revisión a modificar, si existe
  const [sexo, setSexo] = useState((revisionModificar) ? revisionModificar.sexo.idSexo : null); // 0 = Macho y 1 = Hembra
  const [condicionBucal, setCondicionBucal] = useState((revisionModificar) ? String(revisionModificar.condicionBucal.idCondicionBucal) : '');
  const [condicionCorporal, setCondicionCorporal] = useState((revisionModificar) ? revisionModificar.condicionCorporal : 0);
  const [enfermedad, setEnfermedad] = useState((revisionModificar) ? String(revisionModificar.enfermedad.idEnfermedad) : '');
  const [caravana, setCaravana] = useState((revisionModificar) ? revisionModificar.caravana : ''); // Campo para la caravana

  console.log(revisionModificar);
  
  const handleConsultar = () => {
    setAction('C');
  };

  const validarFormulario = () => {
    if (sexo === null) {
      Alert.alert('Error', 'Debe seleccionar el sexo del ovino.');
      return false;
    }
    if (condicionBucal === '') {
      Alert.alert('Error', 'Debe seleccionar una condición bucal.');
      return false;
    }
    if (condicionCorporal === 0) {
      Alert.alert('Error', 'La condición corporal no puede ser 0.');
      return false;
    }
    return true;
  };

  const handleRegistro = () => {
    if (!validarFormulario()) return; // Si la validación falla, no continúa
    try {
      instanciaControlador.registrarRevision(sexo, condicionCorporal, condicionBucal, enfermedad, caravana);
      console.log("Revisión registrada con éxito");
      setSexo(null);
      setCondicionBucal('');
      setCondicionCorporal(0);
      setEnfermedad('');
      setCaravana('');
    } catch (error) {
      console.log("Error al registrar la revisión:", error);
    }
  };

  const handleActualizar = () => {
    if (!validarFormulario()) return; // Si la validación falla, no continúa
    try {
      instanciaControlador.modificarRevision(id, sexo, condicionCorporal, condicionBucal, enfermedad, caravana);
      console.log("Revisión registrada con éxito");
      setSexo(null);
      setCondicionBucal('');
      setCondicionCorporal(0);
      setEnfermedad('');
      setCaravana('');
    } catch (error) {
      console.log("Error al registrar la revisión:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      {revisionModificar === null && (
        <TouchableOpacity style={styles.button} onPress={handleConsultar}>
          <Text style={styles.buttonText}>Lista Majada</Text>
        </TouchableOpacity>
      )}
        <View style={styles.header}>
          <Text style={styles.title}>Registrar Revisión Ovino</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Caravana (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el número de caravana"
            value={caravana}
            onChangeText={setCaravana}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Sexo</Text>
          <SegmentedControlTab
            values={['Macho', 'Hembra']}
            selectedIndex={sexo}
            onTabPress={(index) => setSexo(index)}
            tabsContainerStyle={styles.tabsContainer}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Condición Bucal</Text>
          <Picker
            selectedValue={condicionBucal}
            style={styles.picker}
            onValueChange={(itemValue) => setCondicionBucal(itemValue)}
          >
            <Picker.Item label="Seleccione la condición bucal" value="" />
            <Picker.Item label="ddl" value="1" />
            <Picker.Item label="2d" value="2" />
            <Picker.Item label="4d" value="3" />
            <Picker.Item label="6d" value="4" />
            <Picker.Item label="bll" value="5" />
            <Picker.Item label="md" value="6" />
            <Picker.Item label="sd" value="7" />
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Condición Corporal</Text>
          <Text style={styles.sliderValue}>{condicionCorporal}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={0.5}
            value={condicionCorporal}
            onValueChange={(value) => setCondicionCorporal(value)}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#45658C"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Enfermedad</Text>
          <Picker
            selectedValue={enfermedad}
            style={styles.picker}
            onValueChange={(itemValue) => setEnfermedad(itemValue)}
          >
            <Picker.Item label="Ninguna" value="1" />
            <Picker.Item label="Sarna" value="2" />
            <Picker.Item label="Infección" value="3" />
            <Picker.Item label="Garrapata" value="4" />
            <Picker.Item label="Otra" value="5" />
          </Picker>
        </View>
        <View style={styles.buttonsContainer}>
            {revisionModificar === null && (
            <TouchableOpacity style={styles.button} onPress={OnFinalizar}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          )}
          {revisionModificar !== null && (
            <TouchableOpacity style={styles.button} onPress={handleConsultar}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={OnObservacion}>
            <Text style={styles.buttonText}>Agregar Observación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={revisionModificar === null ? handleRegistro : handleActualizar}>
            <Text style={styles.buttonText}>
              {revisionModificar === null ? 'Registrar' : 'Actualizar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default  RegistrarRevisionOvino;

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
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
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
