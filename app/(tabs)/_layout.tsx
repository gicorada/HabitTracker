import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Import your screens
import Home from './home';
import History from './history';
import Settings from './settings';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { t } = useTranslation();

  return (
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: t('home.title'),
            tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          }}
        />
        <Tab.Screen
          name="history"
          component={History}
          options={{
            title: t('history.title'),
            tabBarIcon: ({ color }) => <Ionicons size={28} name="time" color={color} />,
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            title: t('settings.title'),
            tabBarIcon: ({ color }) => <Ionicons size={28} name="cog" color={color} />,
          }}
        />
      </Tab.Navigator>
  );
}
