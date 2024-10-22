import React, { useEffect, useState } from 'react';
import { Button, ScrollView, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SheepReviewCard from '../../components/SheepReviewCard.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js';

const ConsultarRevisionOvino = () => {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleModify = (id) => {
    navigation.navigate('RegistrarRevisionOvino', { id });
  };

  const handleDelete = (id) => {
    console.log('Eliminar', id);
    // Aquí puedes agregar la lógica para eliminar la revisión
    instanciaControlador.eliminarRevision(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRevisions = await instanciaControlador.obtenerRevisiones();
        setRevisions(allRevisions);
      } catch (error) {
        console.error('Error fetching revisions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
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
            onModify={() => handleModify(revision.id)}
            onDelete={() => handleDelete(revision.id)}
          />
        ))
      )}
    </ScrollView>
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
});

export default ConsultarRevisionOvino;
