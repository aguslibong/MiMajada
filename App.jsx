import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistrarRevisionOvino from './src/Frontend/components/RegistroRevisionOvino';

export default function App() {
  const handleFinalizar = () => {
    console.log('Finalizar pressed');
  };

  const handleObservacion = () => {
    console.log('Agregar Observación pressed');
  };

  return (
    <View style={styles.container}>
      <RegistrarRevisionOvino
        OnFinalizar={handleFinalizar}
        OnObservacion={handleObservacion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
