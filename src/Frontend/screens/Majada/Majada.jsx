import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import ConsultarMajada from './ConsultarMajada.jsx';
import RegistrarMajada from './RegistrarMajada.jsx';
import instanciaControlador from '../../../Backend/Controller/ControladorMajada.js'

const Majada = () => {
    const [action, setAction] = useState('C');
    const [majadas, setMajadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [MajadaModificar, setMajadaModificar] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const allRevisions = await instanciaControlador.obtenerMajada();
            console.log("Todas las MAjadas que tengo:", allRevisions);
            setMajadas(allRevisions);
        } catch (error) {
            console.error('Error fetching revisions:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Efecto para limpiar revisionModificar cuando se cambia de acción
    useEffect(() => {
        if (action === 'C' || action === 'R') {
            setMajadaModificar(null);
        }
    }, [action]);

    // Manejador personalizado para setAction que limpia estados cuando es necesario
    const handleSetAction = useCallback((newAction) => {
        // Si estamos cambiando a consulta o registro nuevo, limpiamos revisionModificar
        if (newAction === 'C' || newAction === 'R') {
            setMajadaModificar(null);
        }
        setAction(newAction);
    }, []);

    const onModificar = useCallback(async (revisionModificar) => {
        setMajadaModificar(revisionModificar);
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

    const onFinalizar = useCallback(async () => {
        // Implementa la lógica de finalización aquí
    }, []);

    const onObservacion = useCallback(async () => {
        // Implementa la lógica de observación aquí
    }, []);

    // Efecto inicial para cargar datos
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <View>
            {(action === 'R' || action === 'M') && (
                <RegistrarMajada
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