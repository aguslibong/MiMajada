import React, { useState, useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import CondicionCorporal from './Datos/CondicionCorporal';
import DiagnosticoRecomendacion from './Datos/DiagnosticoRecomendacion';
import DistribucionEdades from './Datos/DistribucionEdades';
import ControladorDiagnostico from '../../../Backend/Controller/ControladorDiagnostico.js';

const Diagnostico = ({ idMajada }) => {
  const [index, setIndex] = useState(0);
  const [listaDisBucal, setListaDisBucal] = useState([]);

  useEffect(() => {
    obtenerdistribucionBucal();
  }, []);

  const obtenerdistribucionBucal = async () => {
    const lista = await ControladorDiagnostico.calcularPorEdad(idMajada)
    setListaDisBucal(lista);
    console.log(lista)
  };

  const data = [
    { date: '2024-01-01', value: 45 },
    { date: '2024-01-02', value: 52 },
    { date: '2024-01-03', value: 49 },
    { date: '2024-01-04', value: 58 },
    { date: '2024-01-05', value: 55 },
    { date: '2024-01-06', value: 62 },
    { date: '2024-01-07', value: 60 }
  ]
  // Define route components first
  const condicionCorporalRoute = () => <CondicionCorporal data={data} />;
  const distribucionEdadesRoute = () => <DistribucionEdades listaDisBucal={listaDisBucal} />;
  const diagnosticoRecomendacionRoute = () => <DiagnosticoRecomendacion />;

  const [routes] = useState([
    {
      key: 'condicionCorporal',
      title: 'Condición Corporal',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline'
    },
    {
      key: 'distribucionEdades',
      title: 'Distribución Edades',
      focusedIcon: 'album',
      unfocusedIcon: 'album-outline'
    },
    {
      key: 'diagnosticoRecomendacion',
      title: 'Diagnóstico',
      focusedIcon: 'history',
      unfocusedIcon: 'history-outline'
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    condicionCorporal: condicionCorporalRoute,
    distribucionEdades: distribucionEdadesRoute,
    diagnosticoRecomendacion: diagnosticoRecomendacionRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Diagnostico;