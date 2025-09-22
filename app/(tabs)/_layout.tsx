
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 2,
                    paddingTop: 2,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    borderTopColor: '#e0e0e0',
                    position: 'absolute',
                    bottom: 2,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingHorizontal: 10,
                    zIndex: 1000,
                },
                tabBarBackground: () => (
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 55,
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        borderTopColor: '#e0e0e0',
                        zIndex: 999,
                    }} />
                ),

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Properties"
                options={{
                    headerShown: false,
                    title: 'Properties',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="filter" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Payment"
                options={{
                    headerShown: false,
                    title: 'Payment',

                    tabBarIcon: ({ color }) => (
                        <Ionicons name="card" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={24} color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
