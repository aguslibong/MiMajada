import React from 'react';
import { Dimensions, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const GraficaLineal2 = ({ puntoCondCorpTotal }) => {
    // Validación de datos
    if (!puntoCondCorpTotal || !Array.isArray(puntoCondCorpTotal) || puntoCondCorpTotal.length !== 2) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 220
            }}>
                <ActivityIndicator size="large" color="#fb8c00" />
                <Text style={{ marginTop: 10, color: '#666' }}>
                    Cargando datos...
                </Text>
            </View>
        );
    }

    // Ahora sabemos que puntoCondCorpTotal es válido
    const markerPoint = {
        x: puntoCondCorpTotal[0],
        y: puntoCondCorpTotal[1]
    };

    let CondRedondeado = puntoCondCorpTotal[1].toFixed(2);

    // Validación adicional para los valores x e y
    if (typeof markerPoint.x !== 'number' || typeof markerPoint.y !== 'number') {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 220
            }}>
                <Text style={{ color: '#666' }}>
                    Error en el formato de datos
                </Text>
            </View>
        );
    }

    // Asegurarse de que los valores están dentro de rangos válidos
    const validX = Math.max(0, Math.min(markerPoint.x, 12)); // Limitar entre 0 y 12
    const validY = Math.max(0, Math.min(markerPoint.y, 5)); // Limitar entre 0 y 5

    return (
        <View style={{ paddingVertical: 10 }}>
            <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center'
            }}>
                {puntoCondCorpTotal[0] == 1.2 ? 'Condición Corporal en PreSeevicio': puntoCondCorpTotal[0] == 2.2 ? 'Condición Corporal en Preparto' : 'Condición Corporal en PostParto'}
            </Text>
            <LineChart
                data={{
                    labels: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sep', 'Oc', 'Nov', 'Dic'],
                    datasets: [
                        {
                            data: [3, 3 , 3, 2.8, 2.7, 2.5, 2.4, 2.2, 2, 2.2, 2.5, 3]
                        }
                    ]
                }}
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={0.5}
                fromNumber={5}
                fromZero
                formatYLabel={(value) => Number(value).toFixed(1)}
                decorator={() => {
                    try {
                        // Ajustar la posición x para que esté dentro de los 12 meses
                        const screenWidth = Dimensions.get("window").width;
                        const xPos = (validX * (screenWidth - 64)) / 12 + 32;
                        const yPos = ((5 - validY) * (180)) / 5 + 20;
                        
                        return (
                            <View
                                style={{
                                    position: 'absolute',
                                    left: xPos - 6,
                                    top: yPos - 6,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: 'red',
                                    borderWidth: 2,
                                    borderColor: 'white'
                                }}
                            />
                        );
                    } catch (error) {
                        console.error('Error en decorator:', error);
                        return null; // En caso de error, no mostrar el punto
                    }
                }}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    },
                    segments: 5
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <View style={styles.container}>
            <Text style={styles.condicionText}>
                El Promedio de Condicion Corporal de la majada es de: {CondRedondeado}
            </Text>
        </View>
        </View>
        
    );
    
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    condicionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
    },
});

export default GraficaLineal2;