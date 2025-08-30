import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import MapView, { Marker } from 'expo-map';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PropertiesPage() {
    const [activeView, setActiveView] = useState('map');
    const [region, setRegion] = useState({
        latitude: 6.524379,
        longitude: 3.379206,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Properties</Text>
                <TouchableOpacity onPress={() => console.log('Filter pressed')}>
                    <Ionicons name="options" size={24} color="#ffa500" />
                </TouchableOpacity>
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, activeView === 'map' && styles.activeToggle]}
                    onPress={() => setActiveView('map')}
                >
                    <Text style={[styles.toggleText, activeView === 'map' && styles.activeText]}>Map View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, activeView === 'list' && styles.activeToggle]}
                    onPress={() => setActiveView('list')}
                >
                    <Text style={[styles.toggleText, activeView === 'list' && styles.activeText]}>List View</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {activeView === 'map' ? (
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={region}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 6.524379,
                                    longitude: 3.379206,
                                }}
                                title="Property"
                            />
                        </MapView>
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        <Text style={styles.listPlaceholderText}>List of properties would go here.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
    },
    toggleButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    activeToggle: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffa500',
    },
    toggleText: {
        fontSize: 16,
        color: '#888',
    },
    activeText: {
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    mapContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        height: 400,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 16,
    },
    listPlaceholderText: {
        fontSize: 16,
        color: '#888',
    }
});
