import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const NavegacionInferior = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="ConsultarMajada"
        component={ConsultarMajada}
        options={{
          tabBarLabel: 'Consultar Majada',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="clipboard-list" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="RegistrarMajada"
        component={RegistrarMajada}
        options={{
          tabBarLabel: 'Registrar Majada',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="plus-circle" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

function ConsultarMajada() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Consultar Majada</Text>
    </View>
  );
}

function RegistrarMajada() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Registrar Majada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavegacionInferior;