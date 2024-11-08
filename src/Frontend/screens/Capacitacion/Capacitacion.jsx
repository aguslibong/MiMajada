import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Capacitacion = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Capacitación</Text>
            <Text style={styles.description}>Bienvenido a la sección de capacitación.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default Capacitacion;