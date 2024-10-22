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
        const fetchData = async () => {
          try {
            const allRevisions = await instanciaControlador.obtenerRevisiones();
            setRevisions(allRevisions);
          } catch (error) {
            console.error('Error fetching revisions:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

    const onModificar = async (revisionModificar) => {
        setRevisionModificar(revisionModificar)
        setAction('M')
    }
 
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
                    <ConsultarRevisionOvino setAction={setAction} revisions={revisions} loading={loading} onModificar={onModificar} /> 
                )
            }
        </View>
    );
};

export default RevisionOvino;