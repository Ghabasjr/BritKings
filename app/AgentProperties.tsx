import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Property Card Component matching the design
const AgentPropertyCard = ({ property, onViewDetails, onViewBuyer, isSold }: any) => (
    <View style={propertyStyles.card}>
        <View style={propertyStyles.imageContainer}>
            <Image
                source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property' }}
                style={propertyStyles.image}
            />
            <View style={propertyStyles.typeTag}>
                <Text style={propertyStyles.typeText}>{property.status}</Text>
            </View>
            <TouchableOpacity style={propertyStyles.favoriteButton}>
                <Ionicons name="heart" size={24} color="#DD7800" />
            </TouchableOpacity>
        </View>

        <View style={propertyStyles.content}>
            <View style={propertyStyles.priceLocationRow}>
                <Text style={propertyStyles.price}>${property.price?.toLocaleString()}</Text>
                <View style={propertyStyles.locationRow}>
                    <Ionicons name="location" size={16} color="#666" />
                    <Text style={propertyStyles.locationText} numberOfLines={1}>
                        {property.address?.split(',').slice(-2).join(',').trim() || 'Location'}
                    </Text>
                </View>
            </View>

            <View style={propertyStyles.detailsRow}>
                <Text style={propertyStyles.detailsText}>{property.bedrooms} beds</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>{property.bathroom} bath</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>
                    {property.size?.toLocaleString()} sqft - {property.available ? 'Active' : 'Inactive'}
                </Text>
            </View>

            <Text style={propertyStyles.address} numberOfLines={1}>{property.address}</Text>

            {/* Action Buttons */}
            <View style={propertyStyles.buttonRow}>
                <TouchableOpacity
                    style={propertyStyles.viewDetailsButton}
                    onPress={() => onViewDetails(property)}
                >
                    <Text style={propertyStyles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={propertyStyles.viewBuyerButton}
                    onPress={() => onViewBuyer(property)}
                >
                    <Text style={propertyStyles.viewBuyerText}>
                        {isSold ? 'View Buyer' : 'View Buyer'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const propertyStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    typeTag: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#DD7800',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    favoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        padding: 16,
    },
    priceLocationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 16,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
        flex: 1,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 14,
        color: '#888',
    },
    separator: {
        fontSize: 14,
        color: '#ddd',
        marginHorizontal: 8,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    viewDetailsButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#DD7800',
    },
    viewBuyerButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    viewBuyerText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});

interface Property {
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
}

export default function AgentPropertiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('assigned');
    const [assignedProperties, setAssignedProperties] = useState<Property[]>([]);
    const [soldProperties, setSoldProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

    // Fetch properties on mount and when tab changes
    useEffect(() => {
        if (activeTab === 'assigned') {
            fetchAssignedProperties();
        } else {
            fetchSoldProperties();
        }
    }, [activeTab]);

    // Filter properties based on search query
    useEffect(() => {
        const properties = activeTab === 'assigned' ? assignedProperties : soldProperties;

        if (searchQuery.trim() === '') {
            setFilteredProperties(properties);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = properties.filter(property =>
                property.name.toLowerCase().includes(query) ||
                property.address.toLowerCase().includes(query) ||
                property.description.toLowerCase().includes(query)
            );
            setFilteredProperties(filtered);
        }
    }, [searchQuery, assignedProperties, soldProperties, activeTab]);

    const fetchAssignedProperties = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

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

            const endpoint = AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId);

            console.log('Fetching assigned properties from:', `${BASE_URL}${endpoint}`);

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Assigned properties response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Assigned properties response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch properties';
                throw new Error(errorMessage);
            }

            const propertiesData = result.responseData || [];
            setAssignedProperties(propertiesData);
            setFilteredProperties(propertiesData);
        } catch (error: any) {
            console.error('Fetch assigned properties error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load assigned properties',
            });
            setAssignedProperties([]);
            setFilteredProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSoldProperties = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

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

            const endpoint = AGENT_AUTH_ENDPOINTS.SOLD_PROPERTY.replace('{agentId}', agentId);

            console.log('Fetching sold properties from:', `${BASE_URL}${endpoint}`);

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Sold properties response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Sold properties response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch sold properties';
                throw new Error(errorMessage);
            }

            const propertiesData = result.responseData || [];
            setSoldProperties(propertiesData);
            setFilteredProperties(propertiesData);
        } catch (error: any) {
            console.error('Fetch sold properties error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load sold properties',
            });
            setSoldProperties([]);
            setFilteredProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (property: Property) => {
        router.push({
            pathname: '/PropertyDetails',
            params: { propertyId: property.propertyId }
        });
    };

    const handleViewBuyer = (property: Property) => {
        Toast.show({
            type: 'info',
            text1: 'View Buyer',
            text2: `Opening buyer information for ${property.name}`,
        });
        // TODO: Navigate to buyer details page
        // router.push({ pathname: '/BuyerDetails', params: { propertyId: property.propertyId } });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Properties</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'assigned' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('assigned')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'assigned' && styles.tabTextActive
                                ]}
                            >
                                Assigned Properties
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'sold' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('sold')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'sold' && styles.tabTextActive
                                ]}
                            >
                                Sold
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Property Cards */}
                    <View style={styles.propertyList}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#DD7800" />
                                <Text style={styles.loadingText}>Loading properties...</Text>
                            </View>
                        ) : filteredProperties.length > 0 ? (
                            filteredProperties.map((property, index) => (
                                <AgentPropertyCard
                                    key={property.propertyId || index}
                                    property={property}
                                    onViewDetails={handleViewDetails}
                                    onViewBuyer={handleViewBuyer}
                                    isSold={activeTab === 'sold'}
                                />
                            ))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="home-outline" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>No properties found</Text>
                                <Text style={styles.emptySubtext}>
                                    {activeTab === 'assigned'
                                        ? 'You don\'t have any assigned properties yet'
                                        : 'You haven\'t sold any properties yet'}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    filterButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 32,
    },
    tab: {
        paddingBottom: 8,
    },
    tabActive: {
        borderBottomWidth: 3,
        borderBottomColor: '#DD7800',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#999',
    },
    tabTextActive: {
        color: '#1a1a1a',
        fontWeight: '600',
    },
    propertyList: {
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
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
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});
