import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GraficaBarra from '../../../components/GraficaBarra';

const DistribucionEdades = ({listaDisBucal}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Distibucion Edades</Text>
            <View style={styles.graphContainer}>
                <GraficaBarra listaDisBucal={listaDisBucal}></GraficaBarra>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    graphContainer: {
        margin: 20,
        padding: 10,             // Espacio dentro del borde
        borderWidth: 2,          // Ancho del borde
        borderColor: '#cccccc',  // Color del borde
        borderRadius: 8,         // Bordes redondeados (opcional)
        backgroundColor: 'white' // Fondo blanco para el gráfico
    }
});


export default DistribucionEdades;

