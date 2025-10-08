import propertyService from '@/services/propertyService';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function PropertiesPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { token } = useAppSelector((state) => state.auth);

    const fetchProperties = async () => {
        try {
            const response = await propertyService.getAllProperties(token || undefined);

            if (response.success) {
                setProperties(response.data?.properties || response.properties || []);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Load Properties',
                    text2: response.message || 'Please try again',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load properties',
            });
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchProperties();
    };

    if (loading) {
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
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#ffa500" />
                    <Text style={styles.loadingText}>Loading properties...</Text>
                </View>
            </SafeAreaView>
        );
    }

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

            <ScrollView
                contentContainerStyle={{ ...styles.scrollContent, paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#ffa500']} />
                }
            >
                {properties.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <Ionicons name="home-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No properties found</Text>
                        <Text style={styles.emptySubtext}>Pull down to refresh</Text>
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        {properties.map((property: any) => (
                            <TouchableOpacity key={property.id} style={styles.propertyCard}>
                                {property.propertyImageUrl ? (
                                    <Image
                                        source={{ uri: property.propertyImageUrl }}
                                        style={styles.propertyImage}
                                    />
                                ) : (
                                    <View style={styles.propertyImagePlaceholder}>
                                        <Ionicons name="home" size={40} color="#ccc" />
                                    </View>
                                )}
                                <View style={styles.propertyInfo}>
                                    <Text style={styles.propertyTitle}>{property.name}</Text>
                                    <Text style={styles.propertyPrice}>₦{property.price?.toLocaleString()}</Text>
                                    <View style={styles.propertyDetails}>
                                        <Ionicons name="location" size={14} color="#888" />
                                        <Text style={styles.propertyLocation}>{property.address}</Text>
                                    </View>
                                    <View style={styles.propertyFeatures}>
                                        <View style={styles.feature}>
                                            <Ionicons name="bed" size={16} color="#666" />
                                            <Text style={styles.featureText}>{property.bedrooms} Beds</Text>
                                        </View>
                                        <View style={styles.feature}>
                                            <Ionicons name="water" size={16} color="#666" />
                                            <Text style={styles.featureText}>{property.bathroom} Baths</Text>
                                        </View>
                                        <View style={styles.feature}>
                                            <Ionicons name="expand" size={16} color="#666" />
                                            <Text style={styles.featureText}>{property.size} sqm</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
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
        paddingTop: 10,
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
    scrollContent: {
        paddingHorizontal: 16,
    },
    listContainer: {
        gap: 16,
    },
    propertyCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    propertyImagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    propertyInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    propertyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    propertyPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffa500',
        marginBottom: 6,
    },
    propertyDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    propertyLocation: {
        fontSize: 13,
        color: '#888',
        marginLeft: 4,
    },
    propertyFeatures: {
        flexDirection: 'row',
        gap: 12,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    featureText: {
        fontSize: 12,
        color: '#666',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#999',
    },
    propertyImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
});
