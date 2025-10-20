import { AGENT_AUTH_ENDPOINTS, BASE_URL, CSTOMER_AUTH_ENDPOINTS } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Property Card Component for Clients
const ClientPropertyCard = ({ property }: any) => (
    <View style={propertyStyles.card}>
        <View style={propertyStyles.imageContainer}>
            <Image
                source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property' }}
                style={propertyStyles.image}
            />
            {/* <View style={propertyStyles.typeTag}>
                <Text style={propertyStyles.typeText}>{property.status}</Text>
            </View> */}
            <View style={[
                propertyStyles.typeTag,
                property.status === 'SOLD' && propertyStyles.soldTag,
                property.status === 'RENTED' && propertyStyles.rentedTag
            ]}>
                <Text style={propertyStyles.typeText}>{property.status}</Text>
            </View>
            <TouchableOpacity style={propertyStyles.favoriteButton}>
                <Ionicons name="heart" size={24} color="#DD7800" />
            </TouchableOpacity>
        </View>
        <View style={propertyStyles.content}>
            <View style={propertyStyles.priceRow}>
                <Text style={propertyStyles.price}>${property.price?.toLocaleString()}</Text>
                <View style={propertyStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#666" />
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
                <Text style={propertyStyles.detailsText}>{property.size?.toLocaleString()} sqft - {property.status}</Text>
            </View>
            <Text style={propertyStyles.address} numberOfLines={1}>{property.address}</Text>

            {/* Action Buttons */}
            <View style={propertyStyles.buttonRow}>
                <TouchableOpacity
                    style={propertyStyles.viewDetailsButton}
                    onPress={() => router.push({ pathname: '/PropertyDetails', params: { propertyId: property.propertyId } })}
                >
                    <Text style={propertyStyles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={propertyStyles.proceedButton}
                    onPress={() => router.push('/paymentPage')}
                >
                    <Text style={propertyStyles.proceedText}>Proceed To Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

// Property Card Component for Agents
const AgentPropertyCard = ({ property, onViewBuyer, isSold }: any) => (
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
            <View style={propertyStyles.priceRow}>
                <Text style={propertyStyles.price}>${property.price?.toLocaleString()}</Text>
                <View style={propertyStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#666" />
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

            {/* Action Buttons for Agent */}
            <View style={propertyStyles.buttonRow}>
                <TouchableOpacity
                    style={propertyStyles.viewDetailsButton}
                    onPress={() => router.push({ pathname: '/PropertyDetails', params: { propertyId: property.propertyId } })}
                >
                    <Text style={propertyStyles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={propertyStyles.proceedButton}
                    onPress={() => onViewBuyer(property)}
                >
                    <Text style={propertyStyles.proceedText}>
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
    soldTag: {
        backgroundColor: '#FF6B6B',
    },
    rentedTag: {
        backgroundColor: '#4ECDC4',
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
    priceRow: {
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
    proceedButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    proceedText: {
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

export default function PropertiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [userRole, setUserRole] = useState<'Agent' | 'Client' | null>(null);

    // Load user role on mount
    useEffect(() => {
        const loadUserRole = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('userRole');
                const role = storedRole === 'Agent' ? 'Agent' : 'Client';
                setUserRole(role);

                // Set default tab based on role
                if (role === 'Agent') {
                    setActiveTab('assigned');
                } else {
                    setActiveTab('want to buy');
                }
            } catch (error) {
                console.error('Error loading user role:', error);
                setUserRole('Client');
                setActiveTab('want to buy');
            }
        };

        loadUserRole();
    }, []);

    // Fetch properties based on active tab
    useEffect(() => {
        // Only fetch if BOTH userRole is loaded AND activeTab is set
        if (activeTab && userRole !== null) {
            fetchProperties();
        }
    }, [activeTab, userRole]);

    // Filter properties based on search query
    useEffect(() => {
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
    }, [searchQuery, properties]);

    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

            let endpoint = '';
            let headers: any = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            if (userRole === 'Agent') {
                // Agent endpoints
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

                if (activeTab === 'assigned') {
                    endpoint = AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId);
                } else if (activeTab === 'sold') {
                    endpoint = AGENT_AUTH_ENDPOINTS.SOLD_PROPERTY.replace('{agentId}', agentId);
                }
            } else {
                // Client endpoints
                let emailOrPhone = '';
                if (userDataString) {
                    try {
                        const userData = JSON.parse(userDataString);
                        emailOrPhone = userData.email || userData.phoneNumber || userData.phone || '';
                    } catch (e) {
                        console.error('Failed to parse user data:', e);
                    }
                }

                if (!emailOrPhone) {
                    throw new Error('User email or phone not found. Please login again.');
                }

                const baseEndpoint = activeTab === 'want to buy'
                    ? CSTOMER_AUTH_ENDPOINTS.CONTACTED_PROPERTY
                    : CSTOMER_AUTH_ENDPOINTS.PURCHASED_PROPERTIES;

                endpoint = `${baseEndpoint}?emailOrPhone=${encodeURIComponent(emailOrPhone)}`;
            }

            console.log('Fetching properties from:', `${BASE_URL}${endpoint}`);
            // const propertiesData = result.responseData || [];
            // let filteredData = propertiesData;
            // if (userRole === 'Client' && activeTab === 'Purchased Properties') {
            //     filteredData = propertiesData.filter((prop: Property) => prop.status === 'SOLD');
            // }

            // setProperties(filteredData);
            // setFilteredProperties(filteredData);

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers,
            });

            console.log('Properties response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Properties response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch properties';
                throw new Error(errorMessage);
            }

            const propertiesData = result.responseData || [];

            // Filter purchased properties to only show SOLD items
            let filteredData = propertiesData;
            if (userRole === 'Client' && activeTab === 'Purchased Properties') {
                filteredData = propertiesData.filter((prop: Property) => prop.status === 'SOLD');
            }

            setProperties(filteredData);
            setFilteredProperties(filteredData);
        } catch (error: any) {
            console.error('Fetch properties error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load properties',
            });
            setProperties([]);
            setFilteredProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewBuyer = (property: Property) => {
        Toast.show({
            type: 'info',
            text1: 'View Buyer',
            text2: `Opening buyer information for ${property.name}`,
        });
        // TODO: Navigate to buyer details page
    };

    // Get tabs based on user role
    const getTabs = () => {
        if (userRole === 'Agent') {
            return [
                { label: 'Assigned Properties', value: 'assigned' },
                { label: 'Sold', value: 'sold' },
            ];
        } else {
            return [
                { label: 'want to buy', value: 'want to buy' },
                { label: 'Purchased Properties', value: 'Purchased Properties' },
            ];
        }
    };

    const getEmptyMessage = () => {
        if (userRole === 'Agent') {
            return activeTab === 'assigned'
                ? "You don't have any assigned properties yet"
                : "You haven't sold any properties yet";
        } else {
            return activeTab === 'want to buy'
                ? "You haven't contacted any properties yet"
                : "You haven't purchased any properties yet";
        }
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
                        {getTabs().map((tab) => (
                            <TouchableOpacity
                                key={tab.value}
                                style={[
                                    styles.tab,
                                    activeTab === tab.value && styles.tabActive
                                ]}
                                onPress={() => setActiveTab(tab.value)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab.value && styles.tabTextActive
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
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
                                userRole === 'Agent' ? (
                                    <AgentPropertyCard
                                        key={property.propertyId || index}
                                        property={property}
                                        onViewBuyer={handleViewBuyer}
                                        isSold={activeTab === 'sold'}
                                    />
                                ) : (
                                    <ClientPropertyCard
                                        key={property.propertyId || index}
                                        property={property}
                                    />
                                )
                            ))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="home-outline" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>No properties found</Text>
                                <Text style={styles.emptySubtext}>
                                    {getEmptyMessage()}
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
        paddingTop: 30,
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
