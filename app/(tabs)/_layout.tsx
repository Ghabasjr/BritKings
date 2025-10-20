
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const reduxUserRole = useAppSelector((state) => state.auth.userRole);
    const [userRole, setUserRole] = useState<'Agent' | 'Client'>(reduxUserRole || 'Client');

    useEffect(() => {
        const loadUserRole = async () => {
            try {
                // First check Redux store
                if (reduxUserRole) {
                    setUserRole(reduxUserRole);
                    return;
                }

                // Fallback to AsyncStorage
                const storedRole = await AsyncStorage.getItem('userRole');
                console.log('Loaded role from AsyncStorage:', storedRole);

                if (storedRole === 'Agent') {
                    setUserRole('Agent');
                } else {
                    // Default to Client if no role is found or role is 'Client'
                    setUserRole('Client');
                }
            } catch (error) {
                console.error('Error loading user role:', error);
                // Default to Client on error
                setUserRole('Client');
            }
        };

        loadUserRole();
    }, [reduxUserRole]);

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
            {/* Buyer Home Screen */}
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                    href: userRole === 'Client' ? undefined : null,
                }}
            />

            {/* Agent Home Screen */}
            <Tabs.Screen
                name="agentIndex"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                    href: userRole === 'Agent' ? undefined : null,
                }}
            />

            {/* Properties - Available for both */}
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

            {/* Payment - Buyer Only */}
            <Tabs.Screen
                name="Payment"
                options={{
                    headerShown: false,
                    title: 'Payment',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="card" size={24} color={color} />
                    ),
                    href: userRole === 'Client' ? undefined : null,
                }}
            />

            {/* Lead - Agent Only */}
            <Tabs.Screen
                name="Lead"
                options={{
                    headerShown: false,
                    title: 'Lead',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="card" size={24} color={color} />
                    ),
                    href: userRole === 'Agent' ? undefined : null,
                }}
            />

            {/* Profile - Available for both */}
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
