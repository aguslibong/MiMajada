import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { Chart, Axis, Tooltip, Line, ScaleType } from 'react-native-statistic-charts';

// Componente que acepta datos como prop
const GraficaLineal = ({ data, height = 300, lineColor = '#1890ff' }) => {
  const screenWidth = Dimensions.get('window').width;

  // Validación de datos
  if (!data || data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  // Encontrar valores mínimos y máximos para mejor escala
  const values = data.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

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
            min: Math.max(0, minValue - (maxValue - minValue) * 0.1), // Añade un poco de espacio abajo
            max: maxValue + (maxValue - minValue) * 0.1 // Añade un poco de espacio arriba
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
    </View>
  );
};

export default GraficaLineal;

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