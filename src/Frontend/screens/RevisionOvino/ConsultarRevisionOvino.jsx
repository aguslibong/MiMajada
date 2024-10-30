import React, { useEffect, useState, useCallback } from 'react';
import { Button, ScrollView, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SheepReviewCard from '../../components/SheepReviewCard.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js';

const ConsultarRevisionOvino = ({setAction, revisions, loading, onModificar, onEliminar}) => {
  const handleModify = useCallback((RevisionOvinoModificar) => {
    onModificar(RevisionOvinoModificar);
  }, [onModificar]);

  const handleDelete = useCallback((id) => {
    onEliminar(id);
  }, [onEliminar]);

  const handleRegistro = useCallback(() => {
    setAction('R');
  }, [setAction]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Volver Al Registro</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {revisions.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay ovinos cargados aún</Text>
          </View>
        ) : (
          revisions.map((revision) => (
            <SheepReviewCard
              key={revision.id}
              caravana={revision.caravana}
              sexo={revision.sexo.descripcion}
              condicionBucal={revision.condicionBucal.descripcion}
              condicionCorporal={revision.condicionCorporal}
              enfermedad={revision.enfermedad.descripcion}
              onModify={() => handleModify(revision)}
              onDelete={() => handleDelete(revision.id)}
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

export default ConsultarRevisionOvino;
