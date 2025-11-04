import FilterModal from '@/components/FilterModal/FilterModal';
import GradientButton from '@/components/GradientButton/GradientButton';
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
    price: number;
    status: string;
    propertyImageUrl: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

// Property Card Component matching the new design
const PropertyCard = ({ property, onContactAgent }: { property: Property, onContactAgent: (property: Property) => void }) => (
    <View style={propertyStyles.card}>
        <View style={propertyStyles.imageContainer}>
            <Image
                source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property' }}
                style={propertyStyles.image}
            />
            <TouchableOpacity style={propertyStyles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#666" />
            </TouchableOpacity>
        </View>
        <View style={propertyStyles.content}>
            <View style={propertyStyles.locationRow}>
                <Ionicons name="location-sharp" size={16} color="#666" />
                <Text style={propertyStyles.locationText} numberOfLines={2}>
                    {property.address}
                </Text>
            </View>
            <View style={propertyStyles.detailsRow}>
                <Text style={propertyStyles.detailsText}> Address: {property.address} </Text>
                <Text style={propertyStyles.detailsText}>Size: {property.size} sqft </Text>
                <Text style={propertyStyles.detailsText}>Price: ₦{property.price} </Text>
                <Text style={propertyStyles.detailsText}>Status: {property.status} </Text>
            </View>

            {/* buttons  */}
            <View style={{ marginTop: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>

                <TouchableOpacity
                    style={propertyStyles.viewListingButton}
                    onPress={() => router.push(`/PropertyDetails?propertyId=${property.propertyId}`)}
                >
                    <Text style={propertyStyles.viewListingText}>View Listing</Text>
                </TouchableOpacity>

                <GradientButton
                    title='Contact Partner'
                    onPress={() => onContactAgent(property)}
                />
            </View>
        </View>
    </View>
);

const propertyStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        width: "100%",
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        padding: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 13,
        color: '#333',
        marginLeft: 4,
        flex: 1,
        fontWeight: '500',
    },
    detailsRow: {
        display: "contents",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailsText: {
        fontSize: 11,
        color: '#888',
    },
    separator: {
        fontSize: 11,
        color: '#888',
        marginHorizontal: 6,
    },
    viewListingButton: {
        marginBottom: 8,
        alignItems: 'center',
        paddingVertical: 4,
    },
    viewListingText: {
        fontSize: 13,
        color: '#666',
        textDecorationLine: 'underline',
    },
    contactAgentButton: {
        backgroundColor: '#DD7800',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    contactAgentText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
});

export default function RealEstateHomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('buy');
    const [showSellModal, setShowSellModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const [propertyName, setPropertyName] = useState('');
    const [propertyPrice, setPropertyPrice] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertySize, setPropertySize] = useState('');

    const handleContactAgent = (property: Property) => {
        setSelectedProperty(property);
        setShowContactModal(true);
    };

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
                            {/* <TouchableOpacity onPress={() => router.push('/Messages')} style={styles.iconButton}>
                                <Ionicons name="chatbubble-outline" size={24} color="#333" />
                            </TouchableOpacity> */}
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
                            <View style={styles.propertyGrid}>
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.propertyId}
                                        property={property}
                                        onContactAgent={handleContactAgent}
                                    />
                                ))}
                            </View>
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

            {/* Contact Agent Modal */}
            <Modal
                visible={showContactModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowContactModal(false)}
            >
                <View style={contactModalStyles.overlay}>
                    <View style={contactModalStyles.bottomSheet}>
                        <View style={contactModalStyles.handle} />

                        <Text style={contactModalStyles.title}>Contact Partners</Text>

                        <TouchableOpacity
                            style={contactModalStyles.actionButton}
                            onPress={() => {
                                setShowContactModal(false);
                                router.push({
                                    pathname: '/RequestFinancing',
                                    params: { propertyId: selectedProperty?.propertyId }
                                });
                            }}
                        >
                            <Ionicons name="card-outline" size={20} color="#fff" />
                            <Text style={contactModalStyles.actionButtonText}>Request Financing Info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={contactModalStyles.actionButton}
                            onPress={() => {
                                setShowContactModal(false);
                                router.push({
                                    pathname: '/ScheduleVisit',
                                    params: { propertyId: selectedProperty?.propertyId }
                                });
                            }}
                        >
                            <Ionicons name="calendar-outline" size={20} color="#fff" />
                            <Text style={contactModalStyles.actionButtonText}>Schedule a Visit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={contactModalStyles.actionButton}
                            onPress={() => {
                                setShowContactModal(false);
                                router.push({
                                    pathname: '/AskQuestion',
                                    params: { propertyId: selectedProperty?.propertyId }
                                });
                            }}
                        >
                            <Ionicons name="help-circle-outline" size={20} color="#fff" />
                            <Text style={contactModalStyles.actionButtonText}>Ask a Question</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={contactModalStyles.cancelButton}
                            onPress={() => setShowContactModal(false)}
                        >
                            <Text style={contactModalStyles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
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
        paddingTop: 30
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
    propertyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
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

const contactModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    propertyInfo: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 12,
        marginBottom: 24,
    },
    propertyImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
    },
    propertyDetails: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginLeft: 4,
        flex: 1,
    },
    propertySpecs: {
        fontSize: 12,
        color: '#888',
    },
    actionButton: {
        backgroundColor: '#DD7800',
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    cancelButton: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
});
