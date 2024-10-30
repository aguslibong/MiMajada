import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Consultar Majadas"
        onPress={() => navigation.navigate('Majada', { actionInicial: 'C' })}
      />
      <Button
        title="Registrar Majada Nueva"
        onPress={() => navigation.navigate('Majada', { actionInicial: 'R' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Menu;
