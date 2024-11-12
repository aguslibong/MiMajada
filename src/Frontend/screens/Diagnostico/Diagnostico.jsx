import React, { useState, useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
import CondicionCorporal from './Datos/CondicionCorporal';
import DiagnosticoRecomendacion from './Datos/DiagnosticoRecomendacion';
import DistribucionEdades from './Datos/DistribucionEdades';
import ControladorDiagnostico from '../../../Backend/Controller/ControladorDiagnostico.js';
import { useRoute } from '@react-navigation/native';

const Diagnostico = () => {
    const route = useRoute();
    const { idMajada } = route.params;
    const [index, setIndex] = useState(0);
    const [listaDisBucal, setListaDisBucal] = useState([]);
    const [puntoCondCorpTotal, setPuntoCondCorpTotal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("idMajada en useEffect:", idMajada);
        
        const cargarDatos = async () => {
            setIsLoading(true);
            try {
                console.log("Iniciando carga de datos...");
                const lista = await ControladorDiagnostico.calcularPorEdad(idMajada);
                const punto = await ControladorDiagnostico.condicionCorporalTotal(idMajada);
                
                console.log("Lista obtenida:", lista);
                console.log("Punto obtenido:", punto);
                
                setListaDisBucal(lista)
                setPuntoCondCorpTotal(punto);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (idMajada) {
            cargarDatos();
        } else {
            console.log("No hay idMajada disponible");
            setIsLoading(false);
        }
    }, [idMajada]);

    // Define route components with loading state
    const condicionCorporalRoute = () => (
        isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : (
            <CondicionCorporal 
                puntoCondCorpTotal={puntoCondCorpTotal} 
            />
        )
    );
    
    const distribucionEdadesRoute = () => (
        isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        ) : (
            <DistribucionEdades 
                listaDisBucal={listaDisBucal}
            />
        )
    );
    
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
            focusedIcon: 'chart-bar',
            unfocusedIcon: 'chart-bar'
        },
        {
            key: 'diagnosticoRecomendacion',
            title: 'Diagnóstico',
            focusedIcon: 'clipboard-check',
            unfocusedIcon: 'clipboard-check-outline'
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
