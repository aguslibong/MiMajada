import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { Chart, Axis, Tooltip, Line, ScaleType } from 'react-native-statistic-charts';

const GraficaLinealConPunto = ({ height = 300, lineColor = '#1890ff' }) => {
  const screenWidth = Dimensions.get('window').width;

  const data = [
    { date: '', value: 3 },
    { date: 'OTOÑO', value: 3 },
    { date: 'INVIERNO', value: 2.5 },
    { date: 'PRIMAVERA', value: 2 },
    { date: 'VERANO', value: 3 },

  ]


  const specialPoint = { date: 'INVIERNO', value: 1.5 }
  // Validación de datos
  if (!data || data.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  // Encontrar valores mínimos y máximos para escalar el gráfico
  const values = data.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Calcular la posición del marcador basado en 'specialPoint' si existe
  const xIndex = data.findIndex(item => item.date === specialPoint.date);
  const yValue = specialPoint?.value || 0;

  const xPos = xIndex !== -1 ? ((xIndex + 1) / data.length) * (screenWidth - 20) : 0;
  const yPos = ((maxValue - yValue) / (maxValue - minValue)) * height;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Chart
        data={data}
        style={{ 
          width: screenWidth - 20,
          height: height
        }}
        scale={{
          date: { 
            type: ScaleType.TimeCategory,
            mask: 'MM/DD'
          },
          value: { 
            type: ScaleType.Linear, 
            tickCount: 6,
            min: Math.max(0, minValue - (maxValue - minValue) * 0.1), // Añade espacio abajo
            max: maxValue + (maxValue - minValue) * 0.1 // Añade espacio arriba
          },
        }}
      >
        <Axis 
          field="date" 
          label={{
            formatter: (text) => text.slice(5),
          }}
        />
        <Axis 
          field="value" 
          lineStyle={{ strokeWidth: 0 }} 
          tickLineStyle={{ strokeWidth: 0 }} 
          grid 
        />
        <Line 
          position="date*value"
          style={{
            strokeWidth: 2,
            stroke: lineColor
          }}
        />
        <Tooltip
          crosshair
          crosshairsType="x"
          crosshairStyle={{ 
            strokeColor: 'orange', 
            strokeWidth: 2, 
            strokeStyle: 'solid' 
          }}
          sticky
        />
      </Chart>

      {/* Marcador para el punto especial */}
      {xIndex !== -1 && (
        <View
          style={[
            styles.specialPointMarker,
            {
              left: xPos,
              top: yPos,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialPointMarker: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
});

export default GraficaLinealConPunto;

// Ejemplo de uso:
/*
const MiComponente = () => {
  const datosEjemplo = [
    { date: '2024-01-01', value: 45 },
    { date: '2024-01-02', value: 52 },
    { date: '2024-01-03', value: 49 },
    // ...más datos
  ];

  return (
    <GraficaLineal 
      data={datosEjemplo}
      height={400}
      lineColor="#ff4d4f"
    />
  );
};
*/