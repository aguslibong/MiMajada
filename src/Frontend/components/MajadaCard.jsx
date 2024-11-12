import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

<<<<<<< HEAD
const SheepReviewCard = ({ estancia, epocaDelAño, fecha, observacion, onModify, onDelete }) => {
=======
const SheepReviewCard = ({ estancia, epocaDelAño, fecha, observacion,finalizado, onModify, onDelete, onDiagnostico }) => {
>>>>>>> Agus
  // Convierte la fecha a un objeto Date
  const fechaObjeto = new Date(fecha);
  // Formatea la fecha a dd/MM/yyyy
  const fechaFormateada = fechaObjeto.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
<<<<<<< HEAD
=======
  
  const Esfinalizado = finalizado
  console.log(Esfinalizado)
>>>>>>> Agus

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>Estancia: </Text>
          <Text style={styles.value}>{estancia}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Epoca del Año: </Text>
          <Text style={styles.value}>{epocaDelAño}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha: </Text>
          <Text style={styles.value}>{fechaFormateada}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Observación: </Text>
          <Text style={styles.value}>{observacion}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
<<<<<<< HEAD
        <Button onPress={onModify}>Modificar</Button>
=======
        <Button onPress={onDiagnostico}>Diagnostico</Button>
        {finalizado !== 1 && (<Button onPress={onModify}>Modificar</Button>)}
>>>>>>> Agus
        <Button onPress={onDelete}>Eliminar</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

export default SheepReviewCard;
