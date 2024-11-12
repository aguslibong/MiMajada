import React, { useState, useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import CondicionCorporal from './Datos/CondicionCorporal';
import DiagnosticoRecomendacion from './Datos/DiagnosticoRecomendacion';
import DistribucionEdades from './Datos/DistribucionEdades';
import ControladorDiagnostico from '../../../Backend/Controller/ControladorDiagnostico.js';
import { useRoute } from '@react-navigation/native'

const Diagnostico = () => {
    const route = useRoute(); // Obtén la ruta actual
    const { idMajada } = route.params;
    const [index, setIndex] = useState(0);
    const [listaDisBucal, setListaDisBucal] = useState([]);
    const [puntoCondCorpTotal, setPuntoCondCorpTotal] = useState(null);

    useEffect(() => {
        console.log("idMajada en useEffect:", idMajada); // Debug log
        
        const cargarDatos = async () => {
            try {
                console.log("Iniciando carga de datos..."); // Debug log
                const lista = await ControladorDiagnostico.calcularPorEdad(idMajada);
                const punto = await ControladorDiagnostico.condicionCorporalTotal(idMajada); // Pasamos idMajada aquí
                
                console.log("Lista obtenida:", lista); // Debug log
                console.log("Punto obtenido:", punto); // Debug log
                
                setListaDisBucal(lista);
                setPuntoCondCorpTotal(punto);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        if (idMajada) {
            cargarDatos();
        } else {
            console.log("No hay idMajada disponible"); // Debug log
        }
    }, [idMajada]);

    // Define route components
    const condicionCorporalRoute = () => (
        <CondicionCorporal 
            puntoCondCorpTotal={puntoCondCorpTotal} 
        />
    );
    
    const distribucionEdadesRoute = () => (
        <DistribucionEdades 
            listaDisBucal={listaDisBucal} 
        />
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