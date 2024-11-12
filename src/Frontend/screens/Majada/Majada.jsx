import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import ConsultarMajada from './ConsultarMajada.jsx';
import RegistrarMajada from './RegistrarMajada.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorMajada.js';
import { useRoute } from '@react-navigation/native';

const Majada = () => {
    const route = useRoute();
    const { actionInicial } = route.params;
    const [action, setAction] = useState(actionInicial);
    const [majadas, setMajadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [majadaModificar, setMajadaModificar] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const allRevisions = await instanciaControlador.obtenerMajada();
            setMajadas(allRevisions);
        } catch (error) {
            console.error('Error fetching revisions:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Efecto para actualizar el estado de action cuando cambia actionInicial
    useEffect(() => {
        setAction(actionInicial);
    }, [actionInicial]);

    // Efecto para limpiar majadaModificar cuando se cambia de acción
    useEffect(() => {
        if (action === 'C' || action === 'R') {
            setMajadaModificar(null);
        }
    }, [action]);

    // Manejador personalizado para setAction que limpia estados cuando es necesario
    const handleSetAction = useCallback((newAction) => {
        // Si estamos cambiando a consulta o registro nuevo, limpiamos majadaModificar
        if (newAction === 'C' || newAction === 'R') {
            setMajadaModificar(null);
        }
        setAction(newAction);
    }, []);

    const onModificar = useCallback(async (majadaMod) => {
        setMajadaModificar(majadaMod);
        setAction('M');
        await fetchData();
    }, [fetchData]);

    const onEliminar = useCallback(async (idEliminar) => {
        try {
            await instanciaControlador.eliminarMajada(idEliminar);
            console.log('Eliminar exitoso:');
            setMajadas(prev => prev.filter(revision => revision.id !== idEliminar));
        } catch (error) {
            console.error('Error al eliminar la revisión:', error);
        }
    }, []);

    // Efecto inicial para cargar datos
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <View>
            {(action === 'R' || action === 'M') && (
                <RegistrarMajada
                    setAction={setAction}
                    majadaModificar={majadaModificar}
                    fetchData={fetchData}
                    majadas={majadas}
                />
            )}
            {action === 'C' && (
                <ConsultarMajada
                    setAction={handleSetAction}
                    majadas={majadas}
                    loading={loading}
                    onModificar={onModificar}
                    onEliminar={onEliminar}
                    fetchData={fetchData}
                />
            )}
        </View>
    );
};

export default Majada;
