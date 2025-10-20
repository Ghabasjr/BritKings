import { fetchAgentPropertiesWithFilter, getAgentId, getAgentName, Property } from '@/utils/agentService';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Property Card Component
const PropertyCard = ({ property }: { property: Property }) => (
    <View style={leadStyles.card}>
        {property.propertyImageUrl && (
            <Image
                source={{ uri: property.propertyImageUrl }}
                style={leadStyles.propertyImage}
                resizeMode="cover"
            />
        )}
        <View style={leadStyles.propertyContent}>
            <View style={leadStyles.headerRow}>
                <Text style={leadStyles.name}>{property.name}</Text>
                <View style={[
                    leadStyles.statusBadge,
                    property.status === 'AVAILABLE' && leadStyles.statusAvailable,
                    property.status === 'SOLD' && leadStyles.statusSold,
                ]}>
                    <Text style={leadStyles.status}>{property.status}</Text>
                </View>
            </View>
            <View style={leadStyles.priceRow}>
                <Text style={leadStyles.price}>${property.price?.toLocaleString()}</Text>
                <Text style={leadStyles.available}>
                    {property.available ? 'Active' : 'Inactive'}
                </Text>
            </View>
            <View style={leadStyles.propertyInfo}>
                <View style={leadStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#DD7800" />
                    <Text style={leadStyles.address} numberOfLines={2}>{property.address}</Text>
                </View>
                <Text style={leadStyles.details}>
                    {property.bedrooms} Beds | {property.bathroom} Bath | {property.size?.toLocaleString()} sq ft
                </Text>
                {property.parking && <Text style={leadStyles.details}>Parking: {property.parking}</Text>}
                {property.pools && <Text style={leadStyles.details}>Pools: {property.pools}</Text>}
            </View>
            {property.description && (
                <View style={leadStyles.messageContainer}>
                    <Text style={leadStyles.messageText} numberOfLines={3}>{property.description}</Text>
                </View>
            )}
            <View style={leadStyles.actionButtons}>
                <TouchableOpacity
                    style={leadStyles.viewDetailsButton}
                    onPress={() => router.push({ pathname: '/PropertyDetails', params: { propertyId: property.propertyId } })}
                >
                    <Text style={leadStyles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={leadStyles.contactButton}>
                    <Text style={leadStyles.contactText}>Manage Property</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const leadStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    propertyContent: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
        marginRight: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#E5E5E5',
    },
    statusAvailable: {
        backgroundColor: '#10B981',
    },
    statusSold: {
        backgroundColor: '#EF4444',
    },
    status: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
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
        color: '#DD7800',
    },
    available: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    propertyInfo: {
        marginBottom: 16,
    },
    address: {
        fontSize: 15,
        color: '#333',
        marginLeft: 6,
        flex: 1,
    },
    details: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    messageText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    actionButtons: {
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
    contactButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    contactText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});

export default function AgentDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [agentId, setAgentId] = useState<string>('');
    const [agentName, setAgentName] = useState<string>('Agent');

    const filterOptions = ['All', 'AVAILABLE', 'SOLD', 'PENDING'];

    // Load agent ID and name on mount
    useEffect(() => {
        const loadAgentData = async () => {
            try {
                const [id, name] = await Promise.all([getAgentId(), getAgentName()]);
                setAgentId(id);
                setAgentName(name);
            } catch (error: any) {
                console.error('Error loading agent data:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message || 'Failed to load agent information',
                });
            }
        };

        loadAgentData();
    }, []);

    // Fetch properties when agentId or activeFilter changes
    useEffect(() => {
        if (agentId) {
            fetchProperties();
        }
    }, [agentId, activeFilter]);

    // Filter properties based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProperties(properties);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = properties.filter(property =>
                property.name.toLowerCase().includes(query) ||
                property.address.toLowerCase().includes(query) ||
                property.description.toLowerCase().includes(query) ||
                property.status.toLowerCase().includes(query)
            );
            setFilteredProperties(filtered);
        }
    }, [searchQuery, properties]);

    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAgentPropertiesWithFilter(agentId, activeFilter);
            setProperties(data);
            setFilteredProperties(data);
        } catch (error: any) {
            console.error('Error fetching properties:', error);
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

    // Calculate stats from properties
    const stats = {
        newLead: properties.filter(p => p.status === 'AVAILABLE').length,
        inProgress: properties.filter(p => p.status === 'PENDING').length,
        closed: properties.filter(p => p.status === 'SOLD').length,
        respondRate: properties.length > 0
            ? Math.round((properties.filter(p => p.available).length / properties.length) * 100)
            : 0,
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.greeting}>HEY, {agentName.toUpperCase()}</Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity onPress={() => router.push('/Messages')} style={styles.iconButton}>
                                <Ionicons name="chatbubble-outline" size={26} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/notification')} style={styles.iconButton}>
                                <Ionicons name="notifications-outline" size={26} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Stats Cards */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{stats.newLead}</Text>
                                <Text style={styles.statLabel}>Available</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{stats.inProgress}</Text>
                                <Text style={styles.statLabel}>Pending</Text>
                            </View>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{stats.closed}</Text>
                                <Text style={styles.statLabel}>Sold</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{stats.respondRate}%</Text>
                                <Text style={styles.statLabel}>Active Rate</Text>
                            </View>
                        </View>
                    </View>

                    {/* Properties Section Title */}
                    <Text style={styles.sectionTitle}>My Properties</Text>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={22} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for properties"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Buttons */}
                    <View style={styles.filterContainer}>
                        {filterOptions.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    activeFilter === filter && styles.filterButtonActive
                                ]}
                                onPress={() => setActiveFilter(filter)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        activeFilter === filter && styles.filterTextActive
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Properties List */}
                    <View style={styles.leadsList}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#DD7800" />
                                <Text style={styles.loadingText}>Loading properties...</Text>
                            </View>
                        ) : filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <PropertyCard key={property.propertyId} property={property} />
                            ))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="home-outline" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>No properties found</Text>
                                <Text style={styles.emptySubtext}>
                                    {searchQuery ? 'Try adjusting your search' : 'No properties available with the selected filter'}
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
        backgroundColor: '#FAFAFA',
        paddingTop: 35,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.3,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        marginBottom: 28,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
    },
    statLabel: {
        fontSize: 14,
        color: '#A0A0A0',
        fontWeight: '400',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 18,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 54,
        fontSize: 15,
        color: '#000',
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    filterButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    filterButtonActive: {
        backgroundColor: '#DD7800',
        borderColor: '#DD7800',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    filterTextActive: {
        color: '#fff',
    },
    leadsList: {
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
