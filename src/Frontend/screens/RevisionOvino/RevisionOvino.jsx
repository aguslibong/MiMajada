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
            const allRevisions = instanciaControlador.obtenerRevisiones();
            console.log("Todas las revisiones que tengo:",allRevisions)
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

        // Actualizamos el estado local de revisions para reflejar la eliminación
        const updatedRevisions = revisions.filter((revision) => revision.id !== idEliminar);
        setRevisions(updatedRevisions);

        // Vuelve a llamar a fetchData si necesitas recargar las revisiones desde el servidor
        // await fetchData(); // Puedes quitar esto si no necesitas volver a cargar de la base de datos
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
                    <RegistroRevisionOvino setAction={setAction} revisionModificar={revisionModificar} onFinalizar={onFinalizar} onObservacion={onObservacion} fetchData={fetchData}  />
                )
            }
            {
                action === 'C' && (
                    <ConsultarRevisionOvino setAction={setAction} revisions={revisions} loading={loading} onModificar={onModificar} onEliminar={onEliminar} fetchData={fetchData}/> 
                )
            }
        </View>
    );
};

export default RevisionOvino;