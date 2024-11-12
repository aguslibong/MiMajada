import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GraficaLineal from '../../../components/GraficaLineal';
import GraficaLineal2 from '../../../components/GraficaLineal2';

const CondicionCorporal = ({ puntoCondCorpTotal}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Condición Corporal</Text>
            <View style={styles.graphContainer}>
                 <GraficaLineal2 puntoCondCorpTotal={puntoCondCorpTotal}></GraficaLineal2>
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

export default CondicionCorporal;
