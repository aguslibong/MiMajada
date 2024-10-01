import React, { useState } from 'react';
import { View, Text, Button, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const RegistrarRevisionOvino = ({ OnFinalizar, OnObservacion }) => {
  const [sexo, setSexo] = useState(1); // 0 para Macho, 1 para Hembra
  const [condicionBucal, setCondicionBucal] = useState('');
  const [condicionCorporal, setCondicionCorporal] = useState(3); // Valor inicial

  const handleRegistro = () => {
    const sexoValue = sexo === 0 ? 'Macho' : 'Hembra';
    console.log(`Sexo: ${sexoValue}, Condición Bucal: ${condicionBucal}, Condición Corporal: ${condicionCorporal}`);
    // Aquí puedes manejar el envío de los datos
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Registrar Revision Ovino</Text>
      </View>
      <View>
        <Text style={styles.label}>Sexo</Text>
        <SegmentedControlTab
          values={['Macho', 'Hembra']}
          selectedIndex={sexo}
          onTabPress={setSexo}
          tabsContainerStyle={styles.tabsContainer}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />

        <Text style={styles.label}>Condición Bucal</Text>
        <Picker
          selectedValue={condicionBucal}
          style={styles.picker}
          onValueChange={(itemValue) => setCondicionBucal(itemValue)}
        >
          <Picker.Item label="Seleccione la condición bucal" value="" />
          <Picker.Item label="ddl" value="ddl" />
          <Picker.Item label="2d" value="2d" />
          <Picker.Item label="4d" value="4d" />
          <Picker.Item label="6d" value="6d" />
          <Picker.Item label="md" value="md" />
          <Picker.Item label="sd" value="sd" />
        </Picker>
        <View style={styles.row}>
          <Text style={styles.label}>Condición Corporal</Text>
          <View style={styles.colorboxVioleta}>
            <Text style={styles.sliderValue}>{condicionCorporal}</Text>
          </View>
        </View>
        <View style={styles.sliderContainer}>
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
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={OnFinalizar}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={OnObservacion}>
          <Text style={styles.buttonText}>Agregar Observacion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: '#7893B6',
    borderColor: "black"
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    backgroundColor: '#ecf0f1',
    padding: 8,
    color: '#7893B6'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#7893B6', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#0', 
    fontWeight: 'bold',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    fontSize: 24,
    width: 40,
    textAlign: 'center',
  },
  colorboxVioleta: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: '#7893B6',
    textAlign: 'center',
    alignItems: 'flex-end'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabStyle: {
    borderColor: 'black',
  },
  activeTabStyle: {
    backgroundColor: '#7893B6',
  },
  tabTextStyle: {
    color: 'black',
  },
  activeTabTextStyle: {
    color: 'black',
  },
});

export default RegistrarRevisionOvino;
