import GradientButton from '@/components/GradientButton/GradientButton';
import { AGENT_AUTH_ENDPOINTS, BASE_URL, CSTOMER_AUTH_ENDPOINTS } from '@/constants/api';
import { useAppSelector } from '@/store/hooks';
import { checkAuth, fetchWithAuth } from '@/utils/authGuard';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface PropertyData {
    propertyId: string;
    name: string;
    address: string;
    description: string;
    size: number;
    bedrooms: string;
    parking: string;
    bathroom: string;
    pools: string;
    price: number;
    status: string;
    propertyImageUrl: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    userId?: string; // Optional agent ID
}

export default function PropertyDetailsScreen() {
    const params = useLocalSearchParams();
    const propertyId = params.propertyId as string;

    const [userRole, setUserRole] = useState<'Agent' | 'Client'>('Client');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [property, setProperty] = useState<PropertyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const reduxUserRole = useAppSelector((state) => state.auth.userRole);
    const [agentData, setAgentData] = useState<any>(null);

    // Check auth and load data on mount
    useEffect(() => {
        const initializeScreen = async () => {
            // Check authentication
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                return; // Auth guard will redirect to login
            }

            // Load user role
            await loadUserRole();

            // Fetch property data
            await fetchPropertyDetails();
        };

        initializeScreen();
    }, [propertyId]);

    const loadUserRole = async () => {
        try {
            // First check Redux store
            if (reduxUserRole) {
                setUserRole(reduxUserRole);
                return;
            }

            // Fallback to AsyncStorage
            const storedRole = await AsyncStorage.getItem('userRole');
            if (storedRole === 'Agent') {
                setUserRole('Agent');
            } else {
                setUserRole('Client');
            }
        } catch (error) {
            console.error('Error loading user role:', error);
            setUserRole('Client');
        }
    };

    const fetchPropertyDetails = async () => {
        if (!propertyId) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Property ID is required',
            });
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);

            // Build endpoint URL - replace {propertyId} placeholder
            const endpoint = CSTOMER_AUTH_ENDPOINTS.PROPERTY.replace('{propertyId}', propertyId);
            const url = `${BASE_URL}${endpoint}`;

            console.log('Fetching property details from:', url);

            // Use fetchWithAuth which handles token expiration automatically
            const response = await fetchWithAuth(url, {
                method: 'GET',
            });

            console.log('Property details response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Property details response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch property details';
                throw new Error(errorMessage);
            }

            // Set property data from responseData
            const propertyData = result.responseData;
            setAgentData(propertyData?.agent);
            console.log('Property Data:', propertyData);
            console.log('Property userId:', propertyData?.userId);
            setProperty(propertyData);
        } catch (error: any) {
            console.error('Fetch property details error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load property details',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = () => {
        setShowUpdateModal(true);
    };

    const handleConfirmUpdate = async () => {
        try {
            // Get auth token and agent data
            const token = await AsyncStorage.getItem('authToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

            // Get agentId from user data
            let agentId = '';
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    agentId = userData.agentId || userData.userId || userData.id || '';
                } catch (e) {
                    console.error('Failed to parse user data:', e);
                }
            }

            if (!agentId) {
                throw new Error('Agent ID not found. Please login again.');
            }

            // Build the endpoint URL - replace {agentId} and {propertyId}
            const endpoint = AGENT_AUTH_ENDPOINTS.AVAILABILTY
                .replace('{agentId}', agentId)
                .replace('{propertyId}', propertyId);

            const availableValue = !property?.available;
            const url = `${BASE_URL}${endpoint}?available=${availableValue}`;

            console.log('Updating property availability:', url);

            // Make PUT request to update availability
            const response = await fetchWithAuth(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Update availability response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Update availability response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to update property availability';
                throw new Error(errorMessage);
            }

            // Success - close modal and show success message
            setShowUpdateModal(false);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Property availability updated successfully',
            });

            // Refresh property details to show updated status
            await fetchPropertyDetails();

        } catch (error: any) {
            console.error('Update availability error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to update property availability',
            });
        }
    };

    const handleCancelUpdate = () => {
        setShowUpdateModal(false);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#DD7800" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Property Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#DD7800" />
                        <Text style={styles.loadingText}>Loading property details...</Text>
                    </View>
                ) : property ? (
                    <>
                        {/* Property Image Carousel */}
                        <View style={styles.imageCarousel}>
                            <Image
                                source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property+Image' }}
                                style={styles.mainImage}
                            />
                            <View style={styles.carouselIndicator}>
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                        </View>

                        {/* Available Badge */}
                        <View style={[styles.availableBadge, !property.available && styles.unavailableBadge]}>

                            <Text style={[styles.availableText, !property.available && styles.unavailableText]}>
                                {property.status}
                            </Text>
                        </View>

                        {/* Address */}
                        <Text style={styles.address}>{property.address}</Text>

                        {/* Quick Info Cards */}
                        <View style={styles.quickInfoContainer}>
                            <View style={styles.quickInfoCard}>
                                <Text style={styles.quickInfoText}>{property.bedrooms} Bedroom</Text>
                            </View>
                            <View style={styles.quickInfoCard}>
                                <Text style={styles.quickInfoText}>{property.bathroom} Bathroom</Text>
                            </View>
                            <View style={styles.quickInfoCard}>
                                <Text style={styles.quickInfoText}>{property.size?.toLocaleString()} sqft</Text>
                            </View>
                            <View style={styles.quickInfoCard}>
                                <Text style={styles.quickInfoText}>{property.status}</Text>
                            </View>
                        </View>

                        {/* Property Type and Year */}
                        <View style={styles.propertyInfoRow}>
                            <View style={styles.propertyInfoItem}>
                                <Ionicons name="home-outline" size={20} color="#666" />
                                <Text style={styles.propertyInfoText}>{property.name}</Text>
                            </View>
                            <View style={styles.propertyInfoItem}>
                                <Ionicons name="car-outline" size={20} color="#666" />
                                <Text style={styles.propertyInfoText}>Parking: {property.parking}</Text>
                            </View>
                        </View>

                        {/* Price */}
                        <Text style={styles.pricePerSqft}>${property.price?.toLocaleString()}</Text>

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.sectionText}>
                                {property.description || 'No description available'}
                            </Text>
                        </View>

                        {/* Property Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Property Details</Text>
                            <Text style={styles.sectionText}>
                                • Pools: {property.pools || 'None'}{'\n'}
                                • Size: {property.size?.toLocaleString()} sqft{'\n'}
                                • Status: {property.status}
                            </Text>
                        </View>

                        {/* Conditional Button based on User Role */}
                        {userRole === 'Client' ? (
                            <GradientButton
                                title={'Contact Agent'}
                                onPress={() => {
                                    const userIdParam = property.userId || '';
                                    console.log('  propertyId:', propertyId);
                                    console.log('  agentData:', agentData);
                                    console.log('  Full property object:', property);
                                    router.push(`/ContacAgent?propertyId=${propertyId}&agentId=${agentData?.agentId}`);
                                }}
                            />
                        ) : (
                            <GradientButton
                                title={'Update Status'}
                                onPress={handleUpdateStatus}
                            />
                        )}

                        <View style={{ height: 30 }} />
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="home-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Property not found</Text>
                    </View>
                )}
            </ScrollView>

            {/* Update Status Modal - Outside the ScrollView but inside SafeAreaView */}
            <Modal
                visible={showUpdateModal}
                transparent
                animationType="fade"
                onRequestClose={handleCancelUpdate}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.content}>
                        <Text style={modalStyles.title}>
                            Are you sure you want to give access to this buyer to make payment
                        </Text>

                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity
                                style={modalStyles.noButton}
                                onPress={handleCancelUpdate}
                            >
                                <Text style={modalStyles.noButtonText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={modalStyles.yesButton}
                                onPress={handleConfirmUpdate}
                            >
                                <Text style={modalStyles.yesButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    imageCarousel: {
        position: 'relative',
        width: '100%',
        height: 250,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    carouselIndicator: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: '#DD7800',
        width: 24,
    },
    availableBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginLeft: 20,
        marginTop: 16,
        gap: 4,
    },
    unavailableBadge: {
        backgroundColor: '#FFEBEE',
    },
    availableText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
    unavailableText: {
        color: '#36f436ff',
    },
    address: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    quickInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginTop: 16,
        gap: 8,
    },
    quickInfoCard: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    quickInfoText: {
        fontSize: 13,
        color: '#333',
    },
    propertyInfoRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 16,
        gap: 24,
    },
    propertyInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    propertyInfoText: {
        fontSize: 14,
        color: '#666',
    },
    pricePerSqft: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DD7800',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 40,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    noButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    noButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#DD7800',
    },
    yesButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    yesButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
});

