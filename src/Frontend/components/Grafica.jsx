import * as React from 'react';
import { View, StyleSheet } from 'react-native'; // Asegúrate de importar View de 'react-native'
import { BarChart } from "react-native-gifted-charts";

const Grafica = ({lista}) => {

    const barData = [
        /* { value: lista[0], label: 'dll', frontColor: '#177AD5'  },
        { value:  lista[1], label: '2d', frontColor: '#177AD5' },
        { value:  lista[2], label: '4d', frontColor: '#177AD5' },
        { value:  lista[3], label: '6d',frontColor: '#177AD5'  },
        { value: lista[4], label: 'bll', frontColor: '#177AD5' },
        { value:  lista[5], label: 'md',frontColor: '#177AD5'  },
        { value:  lista[6], label: 'sd', frontColor: '#177AD5'  }, */
        { value: 34, label: 'dll', frontColor: '#177AD5'  },
        { value:  4, label: '2d', frontColor: '#177AD5' },
        { value:  25, label: '4d', frontColor: '#177AD5' },
        { value:  3, label: '6d',frontColor: '#177AD5'  },
        { value: 43, label: 'bll', frontColor: '#177AD5' },
        { value:  47, label: 'md',frontColor: '#177AD5'  },
        { value:  5, label: 'sd', frontColor: '#177AD5'  },
    ];

    return (
        <View style={styles.container}>
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Grafica;
