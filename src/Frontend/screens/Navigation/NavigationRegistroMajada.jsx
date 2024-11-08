import React, { useEffect } from 'react';


const NavigationRegistroMajada = ({navigation}) => {

    useEffect(() => {
        navigation.navigate('Majada', { actionInicial: 'R' });
    }, []);

    return (
        <>
            
        </>
    );
};

export default NavigationRegistroMajada;