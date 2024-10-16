import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import SheepReviewCard from '../../components/SheepReviewCard.jsx';
import { getAllRevisionOvino } from '../../../Backend/service/dbManager/RevisionOvinoManager.js';

const ConsultarRevisionOvino = () => {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleModify = (id) => {
    console.log('Modificar', id);
  };

  const handleDelete = (id) => {
    console.log('Eliminar', id);
    // Aquí puedes agregar la lógica para eliminar la revisión
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRevisions = await getAllRevisionOvino();
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
      {revisions.map((revision) => (
        <SheepReviewCard
          key={revision.id}
          revisionNumber={revision.id}
          caravana={revision.caravana}
          sexo={revision.idSexo}
          condicionBucal={revision.idConditionBucal}
          condicionCorporal={revision.condicionCorporal}
          enfermedad={revision.idEnfermedad}
          onModify={() => handleModify(revision.id)}
          onDelete={() => handleDelete(revision.id)}
        />
      ))}
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
});

export default ConsultarRevisionOvino;
