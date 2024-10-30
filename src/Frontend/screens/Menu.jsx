import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Registrar Majada"
        onPress={() => navigation.navigate('RegistrarMajada')}
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
