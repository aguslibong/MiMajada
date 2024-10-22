import React, { useState, useEffect } from 'react';
import RegistroRevisionOvino from './RegistroRevisionOvino.jsx'
import ConsultarRevisionOvino from './ConsultarRevisionOvino.jsx'
import { View } from 'react-native';
import instanciaControlador from '../../../Backend/Controller/ControladorRevisionOvino.js';

const RevisionOvino = () => {
    const [action, setAction] = useState ('R')
    const [revisions, setRevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revisionModificar, setRevisionModificar] = useState (null)
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            console.log("nacho gai")
            const allRevisions = await instanciaControlador.obtenerRevisiones();
            setRevisions(allRevisions);
        } catch (error) {
          console.error('Error fetching revisions:', error);
        } finally {
          setLoading(false);
        }
    };

    const onModificar = async (revisionModificar) => {
        setRevisionModificar(revisionModificar)
        setAction('M')
        await fetchData()
    }

    const onEliminar = async (idEliminar) => {
        try {
            // Asegúrate de que eliminarRevision sea una función async/await
            await instanciaControlador.eliminarRevision(idEliminar);
            console.log('Eliminar exitoso:', instanciaControlador.revisiones);
            // Vuelve a llamar a fetchData para actualizar la lista de revisiones
            await fetchData();
        } catch (error) {
            console.error('Error al eliminar la revisión:', error);
        }
    };
    
 
    const onFinalizar = async () => {}

    const onObservacion = async () => {}

    
    return (
        <View>
            {
                (action === 'R' || action === 'M') && (
                    <RegistroRevisionOvino setAction={setAction} revisionModificar={revisionModificar} onFinalizar={onFinalizar} onObservacion={onObservacion}  />
                )
            }
            {
                action === 'C' && (
                    <ConsultarRevisionOvino setAction={setAction} revisions={revisions} loading={loading} onModificar={onModificar} onEliminar={onEliminar}/> 
                )
            }
        </View>
    );
};

export default RevisionOvino;