import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Import MapView from expo-map
// import MapView, { Marker } from 'expo-map';
import GradientButton from '@/components/GradientButton/GradientButton';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function PropertyLocationPage() {
    const [location, setLocation] = useState({
        address: 'Muhammadu Buhari Way, Potiskum......',
        latitude: 11.724379,
        longitude: 11.058379,
    });

    const handleUseCurrentLocation = () => {
        // This is where you would implement logic to get the user's current location
        // using Expo Location services and update the state.
        console.log('Fetching current location...');
    };

    const initialRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Property</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.contentContainer}>
                {/* Map Section */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            title="Property Location"
                        />
                    </MapView>
                </View>

                {/* Use Current Location Button */}
                <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
                    <Ionicons name="locate-outline" size={20} color="#fff" />
                    <Text style={styles.locationButtonText}>Use my current location</Text>
                </TouchableOpacity>

                {/* Address and Coordinates */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Address</Text>
                    <Text style={styles.addressText}>{location.address}</Text>

                    <View style={styles.coordinatesContainer}>
                        <View style={styles.coordinateBox}>
                            <Text style={styles.coordinateLabel}>Latitude</Text>
                            <Text style={styles.coordinateValue}>{location.latitude}</Text>
                        </View>
                        <View style={styles.coordinateBox}>
                            <Text style={styles.coordinateLabel}>Longitude</Text>
                            <Text style={styles.coordinateValue}>{location.longitude}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Back Button */}
            <GradientButton title='Back' onPress={() => router.push('/Properties')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    mapContainer: {
        height: 300,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    locationButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 12,
        paddingVertical: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    locationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    infoContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 16,
    },
    coordinatesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coordinateBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    coordinateLabel: {
        fontSize: 12,
        color: '#888',
    },
    coordinateValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffa500',
    },
    backButton: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 16,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    backButtonGradient: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
