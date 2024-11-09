import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GraficaLineal from '../../../components/GraficaLineal';
const CondicionCorporal = ({data}) => {
    return (
        <View style={styles.container}>
            <GraficaLineal data={data}></GraficaLineal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default CondicionCorporal;