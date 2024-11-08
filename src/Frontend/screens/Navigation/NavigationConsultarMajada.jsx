// Opción alternativa 2: Usando useEffect normal
import React, { useEffect } from 'react';

const NavigationConsultarMajada = ({navigation}) => {
    useEffect(() => {
        navigation.navigate('Majada', { actionInicial: 'C' });
    }, [navigation]);
    
    return null;
};

export default NavigationConsultarMajada;