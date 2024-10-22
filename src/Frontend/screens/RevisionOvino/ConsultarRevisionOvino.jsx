import React, { useEffect, useState } from 'react';
import { Button, ScrollView, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SheepReviewCard from '../../components/SheepReviewCard.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js';

const ConsultarRevisionOvino = ({setAction, revisions, loading, onModificar}) => {

  const handleModify = (RevisionOvinoModificar) => {
    onModificar(RevisionOvinoModificar);
  };

  const handleDelete = (id) => {
    console.log('Eliminar', id);
    // Aquí puedes agregar la lógica para eliminar la revisión
    instanciaControlador.eliminarRevision(id);
    setAction('R')
  };

  const handleRegistro = () => {
    setAction('R')
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log(revisions);
 
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
              revisionNumber={revision.nroRevision}
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
