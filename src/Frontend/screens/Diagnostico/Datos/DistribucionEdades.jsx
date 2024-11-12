import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GraficaBarra from '../../../components/GraficaBarra';

const DistribucionEdades = ({listDisBucal}) => {
    return (
        <View style={styles.container}>
            <GraficaBarra listDisBucal={listDisBucal}></GraficaBarra>
            
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

export default DistribucionEdades;