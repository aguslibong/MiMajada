import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Grafica from '../../../components/Grafica'

const DistribucionEdades = ({listDisBucal}) => {
    return (
        <View style={styles.container}>
            <Grafica listDisBucal={listDisBucal}></Grafica>
            
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