import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// A reusable component for a single setting item
const SettingItem = ({ title, message, icon, hasSwitch, onToggle }) => (
    <View style={settingItemStyles.card}>
        <View style={settingItemStyles.content}>
            <View style={settingItemStyles.iconContainer}>
                <Ionicons name={icon} size={24} color="#DD7800" />
            </View>
            <View style={settingItemStyles.textContainer}>
                <Text style={settingItemStyles.title}>{title}</Text>
                <Text style={settingItemStyles.message}>{message}</Text>
            </View>
        </View>
        {hasSwitch && <Switch trackColor={{ false: "#ccc", true: "#DD7800" }} thumbColor={onToggle ? "#fff" : "#f4f3f4"} onValueChange={onToggle} value={onToggle} />}
    </View>
);

const settingItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    }
});

export default function SettingsPage() {
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    const handleReEnrollBiometric = () => {
        // Add logic to re-enroll biometrics
        console.log('Re-enroll Biometric pressed');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color='#DD7800' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionHeader}>Biometric Login</Text>
                <SettingItem
                    title="Enable Biometric Login"
                    message="Use your fingerprint or FaceID to unlock the app"
                    icon="finger-print-outline"
                    hasSwitch={true}
                    onToggle={setBiometricEnabled}
                />

                <TouchableOpacity style={styles.reEnrollButton} onPress={handleReEnrollBiometric}>
                    <Text style={styles.reEnrollText}>Re-enroll Biometric</Text>
                    <Ionicons name="chevron-forward" size={24} color="#DD7800" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 30
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // Add extra padding at the bottom to prevent tab bar overlap
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    reEnrollButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    reEnrollText: {
        fontSize: 16,
        color: "#DD7800",
        fontWeight: 'bold',
    },
});
