import React from 'react';
import { ScrollView } from 'react-native';
import SheepReviewCard from '../../components/SheepReviewCard.jsx';

const ConsultarRevisionOvino = () => {
  
  const handleModify = () => {
    console.log('Modificar');
  };

  const handleDelete = () => {
    console.log('Eliminar');
  };

  return (//la idea es traer las cosas del back y mostrarla en las card
    <ScrollView>
      <SheepReviewCard
        revisionNumber="12345"
        caravana="67890"
        sexo="Macho"
        condicionBucal="Buena"
        condicionCorporal="3"
        enfermedad="Ninguna"
        onModify={handleModify}
        onDelete={handleDelete}
      />
    </ScrollView>
  );
};

export default ConsultarRevisionOvino;