import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const GraficaLineal2 = ({puntoCondCorpTotal}) => {
    
    
    const markerPoint = {x: puntoCondCorpTotal[0], y:  puntoCondCorpTotal[1]}; // El punto que quieres marcar (x: índice del label, y: valor)
    
    return (
        <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
                data={{
                    labels: ['OTOÑO', 'INVIERNO','PRIMAVERA', 'VERANO'],
                    datasets: [
                        {
                            data: [3, 2.5, 2, 3]
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
                formatYLabel={(value) => {
                    // Asegura que los números se muestren con un decimal
                    return Number(value).toFixed(1);
                }}
                decorator={() => {
                    // Calcula la posición del punto en el gráfico
                    const xPos = (markerPoint.x * (Dimensions.get("window").width - 64)) / 3 + 32;
                    const yPos = ((5 - markerPoint.y) * (180)) / 5 + 20;
                    
                    return (
                        <View
                            style={{
                                position: 'absolute',
                                left: xPos - 6, // Ajusta según el tamaño de tu punto
                                top: yPos - 6,  // Ajusta según el tamaño de tu punto
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: 'red',
                                borderWidth: 2,
                                borderColor: 'white'
                            }}
                        />
                    );
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
        </View>
    );
};

export default GraficaLineal2;