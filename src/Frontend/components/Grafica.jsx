import * as React from 'react';
import { View, StyleSheet } from 'react-native'; // Asegúrate de importar View de 'react-native'
import { BarChart } from "react-native-gifted-charts";

const App = ({valuedll,value2d,value4d,value6d,valuebll,valuemd,valuesd}) => {
    const barData = [
        { value: valuedll, label: 'dll', frontColor: '#177AD5'  },
        { value: value2d, label: '2d', frontColor: '#177AD5' },
        { value: value4d, label: '4d', frontColor: '#177AD5' },
        { value: value6d, label: '6d',frontColor: '#177AD5'  },
        { value: valuebll, label: 'bll', frontColor: '#177AD5' },
        { value: valuemd, label: 'md',frontColor: '#177AD5'  },
        { value: valuesd, label: 'sd', frontColor: '#177AD5'  },
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

export default App;
