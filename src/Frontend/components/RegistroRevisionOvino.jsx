import { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import db from '../../Backend/db/db-config';

import { RevisionOvino } from '../../Backend/model/RevisionOvino';
import { SexoService } from '../../Backend/service/Sexo.service';
import { CondicionBucalService } from '../../Backend/service/CondicionBucal.service';
import { Enfermedad } from '../../Backend/model/Enfermedad';

const RegistrarRevisionOvino = ({ OnFinalizar, OnObservacion }) => {
  const [sexo, setSexo] = useState(1); // 0 = Macho y 1 = Hembra
  const [condicionBucal, setCondicionBucal] = useState(''); 
  const [condicionCorporal, setCondicionCorporal] = useState(3);
  
  //borrar despues 
  const enfermedad = new Enfermedad(1, 'sarna');


  const handleRegistro = () => {
    try {
      const sexoValue = SexoService.getInstance().getSexoByDescripcion(sexo);
      const condicionBucalObjetoValue = CondicionBucalService.getInstance().getCondicionBucalByDescripcion(condicionBucal);
      if (sexoValue && condicionBucalObjetoValue) {
        const revisionOvino = new RevisionOvino(
          'defaultCaravana', // Replace 'defaultCaravana' with the actual caravana value
          sexoValue,
          condicionCorporal,
          condicionBucalObjetoValue,
          enfermedad
        );
        db.setupDatabase();
        db.insertConditionBucal(condicionBucalObjetoValue);
        db.insertSexo(sexoValue);
        db.insertRevisionOvino(revisionOvino);
        db.getAllRevisionOvino();
      }
    } catch (error) {
      console.error('Error during registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Registrar Revisión Ovino</Text>
      </View>
      <View>
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
          <Text style={styles.buttonText}>Agregar Observación</Text>
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
    alignItems: 'center', 
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f4f7',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  picker: {
    height: 100,
    width: '100%', // Aumentamos al 100% para que sea más visible
    marginBottom: 20,
    borderWidth: 100,
    backgroundColor: '#7893B6',
    borderColor: "black",
    alignSelf: 'center',
    borderRadius: 5, // Para mejorar la apariencia visual
  },
  title: {
    textAlign: 'center',
    fontSize: 24, 
    marginBottom: 30,
    fontWeight: 'bold',
    backgroundColor: '#ecf0f1',
    padding: 15,
    color: '#7893B6',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row', // Botones en fila (horizontal)
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%', // Ancho completo de los botones
  },
  button: {
    backgroundColor: '#7893B6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1, // Distribuir espacio uniformemente entre los botones
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row', // Cambiamos a fila para que el valor y el slider estén alineados
    alignItems: 'center',
    marginVertical: 20,
    width: '100%', // Ancho completo del contenedor
    justifyContent: 'space-between', // Espaciado entre el texto y el slider
  },
  slider: {
    flex: 1, // El slider ocupará todo el espacio disponible
    marginHorizontal: 10,
  },
  sliderValue: {
    fontSize: 24,
    textAlign: 'center',
    width: 40, // Ajuste para que el valor tenga su propio espacio
  },
  colorboxVioleta: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: '#7893B6',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%', // Ancho ajustado para que no ocupe toda la pantalla
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Alineado en fila con distribución horizontal completa
  },
  tabsContainer: {
    marginBottom: 30,
    width: '100%', // Aumentado al 100% para que se ajuste a la pantalla
  },
  tabStyle: {
    borderColor: 'black',
    paddingVertical: 10,
  },
  activeTabStyle: {
    backgroundColor: '#7893B6',
  },
  tabTextStyle: {
    color: 'black',
    fontSize: 16,
  },
  activeTabTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});



export default RegistrarRevisionOvino;
