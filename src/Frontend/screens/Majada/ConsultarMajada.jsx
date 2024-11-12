import React, { useEffect, useState, useCallback } from 'react';
import { Button, ScrollView, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MajadaCard from '../../components/MajadaCard.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorMajada.js'; // Asegúrate de tener el controlador adecuado
import { useNavigation } from '@react-navigation/native';

const ConsultarMajada = ({ setAction, majadas, loading, onModificar, onEliminar }) => {
  
  const navigation = useNavigation();


  const handleModify = useCallback((MajadaModificar) => {
    onModificar(MajadaModificar);
  }, [onModificar]);

  const handleDelete = useCallback((id) => {
    onEliminar(id);
  }, [onEliminar]);

  const diagnostico = (idMajada) =>{
    console.log('id de la majada a diagnosticar: ' + idMajada)
    // Ejemplo de navegación desde otra pantalla
    navigation.navigate('Diagnostico', { idMajada: idMajada });

  }

  const confirmDelete = useCallback((id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar esta majada? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => handleDelete(id), style: "destructive" },
      ],
      { cancelable: true }
    );
  }, [handleDelete]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        {majadas.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay majadas cargadas aún</Text>
          </View>
        ) : (
          majadas.map((majada) => (
            <MajadaCard
              key={majada.idMajada}
              epocaDelAño={majada.epocaDelAño.descripcion}
              estancia={majada.estancia}
              fecha={majada.fechaDeRevision}
              observacion={majada.observacion}
              finalizado={majada.finalizado}
              onModify={() => handleModify(majada)}
              onDelete={() => confirmDelete(majada.idMajada)}
              onDiagnostico={()=> diagnostico(majada.idMajada)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#000',
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

export default ConsultarMajada;
