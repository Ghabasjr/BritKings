
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#fff',
                    borderTopWidth: 0.5,
                    borderTopColor: '#e0e0e0',
                },

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
                        <Ionicons name="home" size={24} color={color} />
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
