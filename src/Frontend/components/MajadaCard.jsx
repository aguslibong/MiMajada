import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const SheepReviewCard = ({ estancia, epocadelaño, fecha, observaciones }) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.label}>Estancia</Text>
        <Text style={styles.value}>{estancia}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Epoca del Año</Text>
        <Text style={styles.value}>{epocadelaño}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{fecha}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Observacion</Text>
        <Text style={styles.value}>{observaciones}</Text>
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
