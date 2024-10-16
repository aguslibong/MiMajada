import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const SheepReviewCard = ({ revisionNumber, caravana, sexo, condicionBucal, condicionCorporal, enfermedad, onModify, onDelete }) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.label}>Número de Revisión:</Text>
        <Text style={styles.value}>{revisionNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Caravana:</Text>
        <Text style={styles.value}>{caravana}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sexo:</Text>
        <Text style={styles.value}>{sexo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Condición Bucal:</Text>
        <Text style={styles.value}>{condicionBucal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Condición Corporal:</Text>
        <Text style={styles.value}>{condicionCorporal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Enfermedad:</Text>
        <Text style={styles.value}>{enfermedad}</Text>
      </View>
    </Card.Content>
    <Card.Actions>
      <Button onPress={onModify}>Modificar</Button>
      <Button onPress={onDelete}>Eliminar</Button>
    </Card.Actions>
  </Card>
);

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
