import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegistroRevisionOvino from './RegistroRevisionOvino';
import ConsultarRevisionOvino from './ConsultarRevisionOvino';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js'
<<<<<<< HEAD
=======
import ControladorMajada from '../../../Backend/Controller/ControladorMajada.js'
>>>>>>> Agus

const RevisionOvino = ({ route }) => {
    const {idMajada} = route.params
    console.log("preuba de ID q llega el modificar: " + idMajada) 
    const {actionInicial} = route.params
    const [action, setAction] = useState(actionInicial);
    const [revisions, setRevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revisionModificar, setRevisionModificar] = useState(null);
    
    const navigation = useNavigation();

    const fetchData = useCallback(async () => {
        try {
            const allRevisions = await instanciaControlador.obtenerRevisiones(idMajada);
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

<<<<<<< HEAD
    const onFinalizar = useCallback(async () => {
        navigation.navigate('DiagnosticoMajada', { idMajada });
    }, []);
=======
>>>>>>> Agus

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
                    setAction={setAction}
                    revisionModificar={revisionModificar}
<<<<<<< HEAD
                    onFinalizar={onFinalizar}
=======
>>>>>>> Agus
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