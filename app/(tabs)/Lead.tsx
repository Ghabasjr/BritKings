import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Property interface from API response
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

// Lead Card Component matching the design from the image
interface LeadCardProps {
    property: Property;
}

const LeadCard = ({ property }: LeadCardProps) => {
    const getStatusText = () => {
        const requestDate = new Date(property.createdAt);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - requestDate.getTime()) / (1000 * 60 * 60));

        if (diffHours < 24) {
            return 'New request';
        } else if (diffHours < 48) {
            return 'Request from yesterday';
        } else {
            return `Request from ${Math.floor(diffHours / 24)} days ago`;
        }
    };

    const handleViewDetails = () => {
        router.push({
            pathname: '/PropertyDetails',
            params: { propertyId: property.propertyId }
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.name}>{property.name}</Text>
                {property.available && (
                    <View style={styles.availableBadge}>
                        <Text style={styles.availableText}>Available</Text>
                    </View>
                )}
            </View>
            <Text style={styles.status}>{getStatusText()}</Text>

            <View style={styles.propertyRow}>
                <View style={styles.propertyInfo}>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${property.price?.toLocaleString()}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{property.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.address}>{property.address}</Text>
                    <Text style={styles.details}>
                        {property.bedrooms} Beds, {property.bathroom} Bath, {property.size?.toLocaleString()} sq ft
                    </Text>
                    {property.parking && (
                        <Text style={styles.parking}>
                            <Ionicons name="car" size={14} color="#DD7800" /> {property.parking} Parking
                        </Text>
                    )}
                </View>

                {property.propertyImageUrl && (
                    <Image
                        source={{ uri: property.propertyImageUrl }}
                        style={styles.propertyImage}
                        resizeMode="cover"
                    />
                )}
            </View>

            {property.description && (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageLabel}>Property Description:</Text>
                    <Text style={styles.messageText}>{property.description}</Text>
                </View>
            )}

            <View style={styles.timeInfo}>
                <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                <Text style={styles.timeText}>
                    Requested on {new Date(property.createdAt).toLocaleDateString()} at {new Date(property.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>

            <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetails}>
                <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function LeadPage() {
    const [leads, setLeads] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch requested properties on mount
    useEffect(() => {
        fetchRequestedProperties();
    }, []);

    const fetchRequestedProperties = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setIsLoading(true);
        }

        try {
            // Get auth token and user data
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

            // Replace {agentId} in endpoint
            const endpoint = AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId);

            console.log('Fetching requested properties from:', `${BASE_URL}${endpoint}`);

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Requested properties response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Requested properties response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch leads';
                throw new Error(errorMessage);
            }

            // Set properties from responseData
            const leadsData = result.responseData || [];

            // Sort by most recent first
            leadsData.sort((a: Property, b: Property) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setLeads(leadsData);

            if (isRefresh && leadsData.length > 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Leads Refreshed',
                    text2: `Found ${leadsData.length} lead${leadsData.length !== 1 ? 's' : ''}`,
                });
            }
        } catch (error: any) {
            console.error('Fetch requested properties error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load leads',
            });
            setLeads([]);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        fetchRequestedProperties(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ width: 28 }} />
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Lead</Text>
                    {leads.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{leads.length}</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={handleRefresh} disabled={refreshing}>
                    <Ionicons
                        name="refresh-outline"
                        size={24}
                        color={refreshing ? "#ccc" : "#DD7800"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Loading State */}
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#DD7800" />
                            <Text style={styles.loadingText}>Loading leads...</Text>
                        </View>
                    ) : leads.length > 0 ? (
                        <>
                            {/* Leads Count */}
                            <View style={styles.countContainer}>
                                <Text style={styles.countText}>
                                    {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
                                </Text>
                                <Text style={styles.countSubtext}>
                                    {leads.filter(l => {
                                        const hours = Math.floor((new Date().getTime() - new Date(l.createdAt).getTime()) / (1000 * 60 * 60));
                                        return hours < 24;
                                    }).length} new today
                                </Text>
                            </View>

                            {/* Leads List */}
                            {leads.map((lead, index) => (
                                <LeadCard key={lead.propertyId || index} property={lead} />
                            ))}
                        </>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="people-outline" size={80} color="#ccc" />
                            <Text style={styles.emptyText}>No leads yet</Text>
                            <Text style={styles.emptySubtext}>
                                You don't have any requested properties at the moment.
                            </Text>
                            <TouchableOpacity
                                style={styles.refreshButton}
                                onPress={handleRefresh}
                            >
                                <Ionicons name="refresh" size={20} color="#fff" />
                                <Text style={styles.refreshButtonText}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FAFAFA',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    badge: {
        backgroundColor: '#DD7800',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 24,
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
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
    countContainer: {
        marginBottom: 16,
    },
    countText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    countSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
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
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#DD7800',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 20,
    },
    refreshButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 8,
    },
    availableBadge: {
        backgroundColor: '#10B981',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    availableText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
    },
    status: {
        fontSize: 15,
        color: '#10B981',
        fontWeight: '500',
        marginBottom: 16,
    },
    propertyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    propertyInfo: {
        flex: 1,
        paddingRight: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#DD7800',
    },
    statusBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#DD7800',
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
    },
    details: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 4,
    },
    parking: {
        fontSize: 13,
        color: '#666',
        marginTop: 6,
    },
    propertyImage: {
        width: 140,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    messageLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    messageText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    timeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    timeText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    viewDetailsButton: {
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
