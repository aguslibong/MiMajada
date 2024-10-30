import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import RegistroRevisionOvino from './RegistroRevisionOvino';
import ConsultarRevisionOvino from './ConsultarRevisionOvino';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js'

const RevisionOvino = ({ route }) => {
    const [action, setAction] = useState('R');
    const [revisions, setRevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revisionModificar, setRevisionModificar] = useState(null);
    const {idMajada} = route.params 

    const fetchData = useCallback(async () => {
        try {
            const allRevisions = instanciaControlador.obtenerRevisiones();
            console.log("Todas las revisiones que tengo:", allRevisions);
            setRevisions(allRevisions);
        } catch (error) {
            console.error('Error fetching revisions:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Efecto para limpiar revisionModificar cuando se cambia de acción
    useEffect(() => {
        if (action === 'C' || action === 'R') {
            setRevisionModificar(null);
        }
    }, [action]);

    // Manejador personalizado para setAction que limpia estados cuando es necesario
    const handleSetAction = useCallback((newAction) => {
        // Si estamos cambiando a consulta o registro nuevo, limpiamos revisionModificar
        if (newAction === 'C' || newAction === 'R') {
            setRevisionModificar(null);
        }
        setAction(newAction);
    }, []);

    const onModificar = useCallback(async (revisionModificar) => {
        setRevisionModificar(revisionModificar);
        setAction('M');
        await fetchData();
    }, [fetchData]);

    const onEliminar = useCallback(async (idEliminar) => {
        try {
            await instanciaControlador.eliminarRevision(idEliminar);
            console.log('Eliminar exitoso:', instanciaControlador.revisiones);
            setRevisions(prev => prev.filter(revision => revision.id !== idEliminar));
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
                <RegistroRevisionOvino 
                    setAction={handleSetAction}
                    revisionModificar={revisionModificar}
                    onFinalizar={onFinalizar}
                    onObservacion={onObservacion}
                    fetchData={fetchData}
                    revisions={revisions}
                    idMajada={idMajada}
                />
            )}
            {action === 'C' && (
                <ConsultarRevisionOvino 
                    setAction={handleSetAction}
                    revisions={revisions}
                    loading={loading}
                    onModificar={onModificar}
                    onEliminar={onEliminar}
                    fetchData={fetchData}
                />
            )}
        </View>
    );
};

export default RevisionOvino;