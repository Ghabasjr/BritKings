
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    height: 60 + insets.bottom,
                    paddingBottom: 0,
                    paddingTop: 5,
                    borderTopWidth: 1,
                    borderTopColor: "#e0e0e0",
                    elevation: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Index',
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
