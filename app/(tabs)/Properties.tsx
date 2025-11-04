import { AGENT_AUTH_ENDPOINTS, BASE_URL, CSTOMER_AUTH_ENDPOINTS } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import Toast from 'react-native-toast-message';

const ClientPropertyCard = ({ property }: any) => (
    <View style={propertyStyles.card}>
        <View style={propertyStyles.imageContainer}>
            <Image
                source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property' }}
                style={propertyStyles.image}
            />

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
                    onPress={() => router.push('/SecureCheckout')}
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
                <Text style={propertyStyles.price}>₦{property.price?.toLocaleString()}</Text>
                <View style={propertyStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#666" />
                    <Text style={propertyStyles.locationText} numberOfLines={1}>
                        {property.address?.split(',').slice(-2).join(',').trim() || 'Location'}
                    </Text>
                </View>
            </View>
            <View style={propertyStyles.detailsRow}>
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
    buyer?: BuyerInfo;
}

interface BuyerInfo {
    buyerId?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    purchaseDate?: string;
    paymentStatus?: string;
}

export default function PropertiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [userRole, setUserRole] = useState<'Agent' | 'Client' | null>(null);
    const [showBuyerModal, setShowBuyerModal] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState<BuyerInfo | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [loadingBuyer, setLoadingBuyer] = useState(false);

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
        if (activeTab && userRole !== null) {
            fetchProperties();
        }
    }, [activeTab, userRole]);

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

                endpoint = `${CSTOMER_AUTH_ENDPOINTS.CONTACTED_PROPERTY}?emailOrPhone=${encodeURIComponent(emailOrPhone)}`;
            }

            console.log('Fetching properties from:', `${BASE_URL}${endpoint}`);


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

            setProperties(propertiesData);
            setFilteredProperties(propertiesData);
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

    const handleViewBuyer = async (property: Property) => {
        setSelectedProperty(property);
        setShowBuyerModal(true);
        setLoadingBuyer(true);

        try {
            const token = await AsyncStorage.getItem('authToken');
            const userDataString = await AsyncStorage.getItem('userData');

            if (!token) {
                throw new Error('Authentication token not found');
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

            // Fetch buyer information for this property
            const endpoint = `${BASE_URL}${AGENT_AUTH_ENDPOINTS.SOLD_PROPERTY.replace('{agentId}', agentId)}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok && result.responseCode === '00') {
                const soldProperties = result.responseData || [];
                const soldProperty = soldProperties.find((p: any) => p.propertyId === property.propertyId);

                if (soldProperty && soldProperty.buyer) {
                    setSelectedBuyer(soldProperty.buyer);
                } else {
                    // If no buyer info found in the response, show generic info
                    setSelectedBuyer({
                        name: 'Information Not Available',
                        email: 'N/A',
                        phoneNumber: 'N/A',
                    });
                }
            } else {
                throw new Error('Failed to fetch buyer information');
            }
        } catch (error: any) {
            console.error('Fetch buyer error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load buyer information',
            });
            setSelectedBuyer(null);
        } finally {
            setLoadingBuyer(false);
        }
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
            ];
        }
    };

    const getEmptyMessage = () => {
        if (userRole === 'Agent') {
            return activeTab === 'assigned'
                ? "You don't have any assigned properties yet"
                : "You haven't sold any properties yet";
        } else {
            return "You haven't contacted any properties yet";
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

            {/* Buyer Details Modal */}
            <Modal
                visible={showBuyerModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowBuyerModal(false)}
            >
                <View style={modalStyles.modalOverlay}>
                    <View style={modalStyles.modalContent}>
                        {/* Modal Header */}
                        <View style={modalStyles.modalHeader}>
                            <Text style={modalStyles.modalTitle}>Buyer Information</Text>
                            <TouchableOpacity
                                onPress={() => setShowBuyerModal(false)}
                                style={modalStyles.closeButton}
                            >
                                <Ionicons name="close" size={28} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {/* Property Info */}
                        {selectedProperty && (
                            <View style={modalStyles.propertyInfoSection}>
                                <Text style={modalStyles.sectionTitle}>Property</Text>
                                <Text style={modalStyles.propertyName}>{selectedProperty.name}</Text>
                                <Text style={modalStyles.propertyAddress}>{selectedProperty.address}</Text>
                            </View>
                        )}

                        {/* Buyer Details */}
                        {loadingBuyer ? (
                            <View style={modalStyles.loadingSection}>
                                <ActivityIndicator size="large" color="#DD7800" />
                                <Text style={modalStyles.loadingText}>Loading buyer information...</Text>
                            </View>
                        ) : selectedBuyer ? (
                            <ScrollView style={modalStyles.buyerDetailsSection} showsVerticalScrollIndicator={false}>
                                <View style={modalStyles.detailRow}>
                                    <View style={modalStyles.iconContainer}>
                                        <Ionicons name="person" size={20} color="#DD7800" />
                                    </View>
                                    <View style={modalStyles.detailContent}>
                                        <Text style={modalStyles.detailLabel}>Name</Text>
                                        <Text style={modalStyles.detailValue}>{selectedBuyer.name || 'N/A'}</Text>
                                    </View>
                                </View>

                                <View style={modalStyles.detailRow}>
                                    <View style={modalStyles.iconContainer}>
                                        <Ionicons name="mail" size={20} color="#DD7800" />
                                    </View>
                                    <View style={modalStyles.detailContent}>
                                        <Text style={modalStyles.detailLabel}>Email</Text>
                                        <Text style={modalStyles.detailValue}>{selectedBuyer.email || 'N/A'}</Text>
                                    </View>
                                </View>

                                <View style={modalStyles.detailRow}>
                                    <View style={modalStyles.iconContainer}>
                                        <Ionicons name="call" size={20} color="#DD7800" />
                                    </View>
                                    <View style={modalStyles.detailContent}>
                                        <Text style={modalStyles.detailLabel}>Phone Number</Text>
                                        <Text style={modalStyles.detailValue}>{selectedBuyer.phoneNumber || 'N/A'}</Text>
                                    </View>
                                </View>

                                {selectedBuyer.address && (
                                    <View style={modalStyles.detailRow}>
                                        <View style={modalStyles.iconContainer}>
                                            <Ionicons name="location" size={20} color="#DD7800" />
                                        </View>
                                        <View style={modalStyles.detailContent}>
                                            <Text style={modalStyles.detailLabel}>Address</Text>
                                            <Text style={modalStyles.detailValue}>{selectedBuyer.address}</Text>
                                        </View>
                                    </View>
                                )}

                                {selectedBuyer.purchaseDate && (
                                    <View style={modalStyles.detailRow}>
                                        <View style={modalStyles.iconContainer}>
                                            <Ionicons name="calendar" size={20} color="#DD7800" />
                                        </View>
                                        <View style={modalStyles.detailContent}>
                                            <Text style={modalStyles.detailLabel}>Purchase Date</Text>
                                            <Text style={modalStyles.detailValue}>
                                                {new Date(selectedBuyer.purchaseDate).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {selectedBuyer.paymentStatus && (
                                    <View style={modalStyles.detailRow}>
                                        <View style={modalStyles.iconContainer}>
                                            <Ionicons name="card" size={20} color="#DD7800" />
                                        </View>
                                        <View style={modalStyles.detailContent}>
                                            <Text style={modalStyles.detailLabel}>Payment Status</Text>
                                            <Text style={[
                                                modalStyles.detailValue,
                                                selectedBuyer.paymentStatus === 'COMPLETED' && modalStyles.statusCompleted
                                            ]}>
                                                {selectedBuyer.paymentStatus}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        ) : (
                            <View style={modalStyles.emptySection}>
                                <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
                                <Text style={modalStyles.emptyText}>No buyer information available</Text>
                            </View>
                        )}

                        {/* Action Buttons */}
                        {selectedBuyer && selectedBuyer.phoneNumber && selectedBuyer.phoneNumber !== 'N/A' && (
                            <TouchableOpacity style={modalStyles.contactButton}>
                                <Ionicons name="call" size={20} color="#fff" />
                                <Text style={modalStyles.contactButtonText}>Contact Buyer</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
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

const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    propertyInfoSection: {
        backgroundColor: '#FFF8F0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#DD7800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    propertyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    propertyAddress: {
        fontSize: 14,
        color: '#666',
    },
    loadingSection: {
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    buyerDetailsSection: {
        flex: 1,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    statusCompleted: {
        color: '#10B981',
        fontWeight: '600',
    },
    emptySection: {
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
    },
    contactButton: {
        flexDirection: 'row',
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#DD7800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
