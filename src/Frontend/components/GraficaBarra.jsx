import { Dimensions, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;


import React from 'react'

const GraficaBarra = ({listaDisBucal}) => {
    console.log("lista q lleva a grafica Barra: "+ listaDisBucal)
    if (!listaDisBucal || !Array.isArray(listaDisBucal) || listaDisBucal.length !== 7) {
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



    return (
        <View>
            <Text>Distibucion ideal</Text>
             <BarChart
                data={{
                    labels: ["ddl", "2d", "4d", "6d", "bll", "md", "sd"],
                    datasets: [
                        {
                            data: [
                                7,
                                6,
                                5,
                                4,
                                3,
                                2,
                                1,
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#ADD8E6",
                    backgroundGradientFrom: "#00008B",
                    backgroundGradientTo: "#ADD8E6",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#00008B"
                    },
                    formatYLabel: () => '' // Oculta los números en el eje Y
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Text>Distibucion de la Majada</Text>
            <BarChart
                data={{
                    labels: ["ddl", "2d", "4d", "6d", "bll", "md", "sd"],
                    datasets: [
                        {
                            data: [
                                listaDisBucal[0],
                                listaDisBucal[1],
                                listaDisBucal[2],
                                listaDisBucal[3],
                                listaDisBucal[4],
                                listaDisBucal[5],
                                listaDisBucal[6],
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

export default GraficaBarra;