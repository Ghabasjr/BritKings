import FilterModal from '@/components/FilterModal/FilterModal';
import { BASE_URL, CSTOMER_AUTH_ENDPOINTS } from '@/constants/api';
import { fetchWithAuth } from '@/utils/authGuard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Property interface
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

// Property Card Component matching the new design
const PropertyCard = ({ property }: { property: Property }) => (
    <TouchableOpacity
        style={propertyStyles.card}
        onPress={() => router.push(`/PropertyDetails?propertyId=${property.propertyId}`)}
    >
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
                    <Text style={propertyStyles.locationText}>{property.address}</Text>
                </View>
            </View>
            <View style={propertyStyles.detailsRow}>
                <Text style={propertyStyles.detailsText}>{property.bedrooms} beds</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>{property.bathroom} bath</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>{property.size?.toLocaleString()} sqft - {property.status}</Text>
            </View>
            <Text style={propertyStyles.address}>{property.address}</Text>
        </View>
    </TouchableOpacity>
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
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
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
    }
});

export default function RealEstateHomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('buy');
    const [showSellModal, setShowSellModal] = useState(false);

    // Form states for sell modal
    const [propertyName, setPropertyName] = useState('');
    const [propertyPrice, setPropertyPrice] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertySize, setPropertySize] = useState('');

    // Fetch properties on mount
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const url = `${BASE_URL}${CSTOMER_AUTH_ENDPOINTS.PROPERTIES}`;
            console.log('Fetching all properties from:', url);

            // Use fetchWithAuth which handles token expiration
            const response = await fetchWithAuth(url, {
                method: 'GET',
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

            // Get properties from paginated response
            const propertiesData = result.responseData?.content || [];
            setAllProperties(propertiesData);
            setProperties(propertiesData);
        } catch (error: any) {
            console.error('Fetch properties error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load properties',
            });
            setAllProperties([]);
            setProperties([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to filter properties based on search query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setProperties(allProperties);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const filteredProperties = allProperties.filter(property =>
            property.name.toLowerCase().includes(lowerCaseQuery) ||
            property.address.toLowerCase().includes(lowerCaseQuery) ||
            property.description.toLowerCase().includes(lowerCaseQuery) ||
            property.status.toLowerCase().includes(lowerCaseQuery)
        );
        setProperties(filteredProperties);
    };



    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Header with Title and Icons */}
                    <View style={styles.headerRow}>
                        <Text style={styles.mainTitle}>
                            Find Your Best{'\n'}Real Estate
                        </Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity onPress={() => router.push('/Messages')} style={styles.iconButton}>
                                <Ionicons name="chatbubble-outline" size={24} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/notification')} style={styles.iconButton}>
                                <Ionicons name="notifications-outline" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Search Bar with Filter */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for properties"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />

                    </View>

                    <FilterModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />

                    {/* Buy/Sell Toggle Buttons */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[styles.toggleButton, activeTab === 'buy' && styles.toggleButtonActive]}
                            onPress={() => setActiveTab('buy')}
                        >
                            <Text style={[styles.toggleText, activeTab === 'buy' && styles.toggleTextActive]}>
                                Buy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, activeTab === 'sell' && styles.toggleButtonActive]}
                            onPress={() => {
                                setActiveTab('sell');
                                setShowSellModal(true);
                            }}
                        >
                            <Text style={[styles.toggleText, activeTab === 'sell' && styles.toggleTextActive]}>
                                Sell
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Property Cards List */}
                    <View style={styles.propertyList}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#DD7800" />
                                <Text style={styles.loadingText}>Loading properties...</Text>
                            </View>
                        ) : properties.length > 0 ? (
                            properties.map((property) => (
                                <PropertyCard key={property.propertyId} property={property} />
                            ))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="home-outline" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>No properties found</Text>
                                <Text style={styles.emptySubtext}>
                                    Try adjusting your search or check back later
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Sell Modal */}
            <Modal
                visible={showSellModal}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setShowSellModal(false);
                    setActiveTab('buy');
                }}
            >
                <View style={sellModalStyles.overlay}>
                    <View style={sellModalStyles.content}>
                        <Text style={sellModalStyles.title}>
                            List Your Property
                        </Text>

                        <View style={sellModalStyles.formContainer}>
                            <TextInput
                                style={sellModalStyles.input}
                                placeholder="Property Name"
                                placeholderTextColor="#888"
                                value={propertyName}
                                onChangeText={setPropertyName}
                            />

                            <TextInput
                                style={sellModalStyles.input}
                                placeholder="Price"
                                placeholderTextColor="#888"
                                value={propertyPrice}
                                onChangeText={setPropertyPrice}
                                keyboardType="numeric"
                            />

                            <TextInput
                                style={sellModalStyles.input}
                                placeholder="Location"
                                placeholderTextColor="#888"
                                value={propertyLocation}
                                onChangeText={setPropertyLocation}
                            />

                            <TextInput
                                style={sellModalStyles.input}
                                placeholder="Size (sqft)"
                                placeholderTextColor="#888"
                                value={propertySize}
                                onChangeText={setPropertySize}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={sellModalStyles.buttonContainer}>
                            <TouchableOpacity
                                style={sellModalStyles.cancelButton}
                                onPress={() => {
                                    setShowSellModal(false);
                                    setActiveTab('buy');
                                    // Clear form
                                    setPropertyName('');
                                    setPropertyPrice('');
                                    setPropertyLocation('');
                                    setPropertySize('');
                                }}
                            >
                                <Text style={sellModalStyles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={sellModalStyles.submitButton}
                                onPress={() => {
                                    setShowSellModal(false);
                                    // Handle form submission here
                                    console.log({
                                        name: propertyName,
                                        price: propertyPrice,
                                        location: propertyLocation,
                                        size: propertySize
                                    });
                                    // Navigate to listing creation or handle sell action
                                    router.push('/newListing');
                                    // Clear form
                                    setPropertyName('');
                                    setPropertyPrice('');
                                    setPropertyLocation('');
                                    setPropertySize('');
                                }}
                            >
                                <Text style={sellModalStyles.submitButtonText}>Submit</Text>
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
        backgroundColor: '#f5f5f5',
        paddingTop: 25
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        lineHeight: 20,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
    filterButton: {
        padding: 8,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 4,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#DD7800',
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
    },
    toggleTextActive: {
        color: '#fff',
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

const sellModalStyles = StyleSheet.create({
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
        padding: 30,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginBottom: 24,
    },
    formContainer: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    cancelButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#DD7800',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
});
