import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import { CustomerQuestion, FinancialRequest } from '@/types/lead';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

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
                        <Text style={styles.price}>₦{property.price?.toLocaleString()}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{property.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.address}>{property.address}</Text>


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

// Customer Question Card Component
interface CustomerQuestionCardProps {
    question: CustomerQuestion;
}

const CustomerQuestionCard = ({ question }: CustomerQuestionCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Ionicons name="help-circle" size={24} color="#DD7800" />
                <View style={styles.questionBadge}>
                    <Text style={styles.questionBadgeText}>Customer Question</Text>
                </View>
            </View>

            <Text style={styles.name}>{question.fullName}</Text>

            <View style={styles.contactInfo}>
                <View style={styles.contactRow}>
                    <Ionicons name="mail-outline" size={16} color="#666" />
                    <Text style={styles.contactText}>{question.email}</Text>
                </View>
                <View style={styles.contactRow}>
                    <Ionicons name="call-outline" size={16} color="#666" />
                    <Text style={styles.contactText}>{question.phone}</Text>
                </View>
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.messageLabel}>Question:</Text>
                <Text style={styles.messageText}>{question.message}</Text>
            </View>

            {question.agentDetails && (
                <View style={styles.agentInfo}>
                    <Text style={styles.agentLabel}>Assigned Partner:</Text>
                    <Text style={styles.agentName}>{question.agentDetails.staffName}</Text>
                    <Text style={styles.agentContact}>{question.agentDetails.email}</Text>
                </View>
            )}
        </View>
    );
};

// Financial Request Card Component
interface FinancialRequestCardProps {
    request: FinancialRequest;
}

const FinancialRequestCard = ({ request }: FinancialRequestCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Ionicons name="cash" size={24} color="#10B981" />
                <View style={styles.financialBadge}>
                    <Text style={styles.financialBadgeText}>Financial Request</Text>
                </View>
            </View>

            <Text style={styles.name}>{request.fullName}</Text>

            <View style={styles.contactInfo}>
                <View style={styles.contactRow}>
                    <Ionicons name="call-outline" size={16} color="#666" />
                    <Text style={styles.contactText}>{request.phoneNumber}</Text>
                </View>
                <View style={styles.contactRow}>
                    <Ionicons name="briefcase-outline" size={16} color="#666" />
                    <Text style={styles.contactText}>{request.employmentStatus}</Text>
                </View>
            </View>

            <View style={styles.financialDetails}>
                <View style={styles.financialRow}>
                    <Text style={styles.financialLabel}>Budget:</Text>
                    <Text style={styles.financialValue}>₦{request.budget?.toLocaleString()}</Text>
                </View>
                <View style={styles.financialRow}>
                    <Text style={styles.financialLabel}>Annual Income:</Text>
                    <Text style={styles.financialValue}>₦{request.annualIncome?.toLocaleString()}</Text>
                </View>
            </View>

            {request.property && (
                <View style={styles.propertySection}>
                    <Text style={styles.propertySectionLabel}>Interested Property:</Text>
                    <View style={styles.propertyRowCompact}>
                        <View style={styles.propertyInfoCompact}>
                            <Text style={styles.propertyNameCompact}>{request.property.name}</Text>
                            <Text style={styles.propertyAddressCompact}>{request.property.address}</Text>
                            <Text style={styles.propertyPriceCompact}>₦{request.property.price?.toLocaleString()}</Text>
                        </View>
                        {request.property.propertyImageUrl && (
                            <Image
                                source={{ uri: request.property.propertyImageUrl }}
                                style={styles.propertyImageSmall}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                </View>
            )}

            {request.customer && (
                <View style={styles.customerInfo}>
                    <Text style={styles.customerLabel}>Customer Details:</Text>
                    <Text style={styles.customerEmail}>{request.customer.email}</Text>
                </View>
            )}
        </View>
    );
};

export default function LeadPage() {
    const [leads, setLeads] = useState<Property[]>([]);
    const [customerQuestions, setCustomerQuestions] = useState<CustomerQuestion[]>([]);
    const [financialRequests, setFinancialRequests] = useState<FinancialRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch all data on mount
    useEffect(() => {
        fetchAllLeadsData();
    }, []);

    const fetchAllLeadsData = async (isRefresh = false) => {
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

            // Fetch all three endpoints in parallel
            const [propertiesResponse, questionsResponse, financialResponse] = await Promise.all([
                // Fetch requested properties
                fetch(`${BASE_URL}${AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }),
                // Fetch customer questions
                fetch(`${BASE_URL}${AGENT_AUTH_ENDPOINTS.GET_ALL_CUSTOMER_QUESTIONS(agentId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }),
                // Fetch financial requests
                fetch(`${BASE_URL}${AGENT_AUTH_ENDPOINTS.GET_ALL_FINANCIAL_REQUEST(agentId)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }),
            ]);

            // Parse all responses
            const propertiesResult = await propertiesResponse.json();
            const questionsResult = await questionsResponse.json();
            const financialResult = await financialResponse.json();

            console.log('Properties result:', propertiesResult);
            console.log('Questions result:', questionsResult);
            console.log('Financial result:', financialResult);

            // Set properties
            if (propertiesResponse.ok && propertiesResult.responseCode === '00') {
                const leadsData = propertiesResult.responseData || [];
                leadsData.sort((a: Property, b: Property) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setLeads(leadsData);
            } else {
                setLeads([]);
            }

            // Set customer questions
            if (questionsResponse.ok && questionsResult.responseCode === '00') {
                setCustomerQuestions(questionsResult.responseData || []);
            } else {
                setCustomerQuestions([]);
            }

            // Set financial requests
            if (financialResponse.ok && financialResult.responseCode === '00') {
                setFinancialRequests(financialResult.responseData || []);
            } else {
                setFinancialRequests([]);
            }

            const totalLeads = (propertiesResult.responseData?.length || 0) +
                (questionsResult.responseData?.length || 0) +
                (financialResult.responseData?.length || 0);

            if (isRefresh && totalLeads > 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Leads Refreshed',
                    text2: `Found ${totalLeads} total lead${totalLeads !== 1 ? 's' : ''}`,
                });
            }
        } catch (error: any) {
            console.error('Fetch leads error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to load leads',
            });
            setLeads([]);
            setCustomerQuestions([]);
            setFinancialRequests([]);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        fetchAllLeadsData(true);
    };

    const totalLeadsCount = leads.length + customerQuestions.length + financialRequests.length;
    const hasAnyLeads = totalLeadsCount > 0;

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ width: 28 }} />
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Lead</Text>
                    {hasAnyLeads && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{totalLeadsCount}</Text>
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
                    ) : hasAnyLeads ? (
                        <>
                            {/* Leads Count */}
                            <View style={styles.countContainer}>
                                <Text style={styles.countText}>
                                    {totalLeadsCount} {totalLeadsCount === 1 ? 'Lead' : 'Leads'}
                                </Text>
                                <Text style={styles.countSubtext}>
                                    {leads.length} properties • {customerQuestions.length} questions • {financialRequests.length} financial
                                </Text>
                            </View>

                            {/* Property Requests */}
                            {leads.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>Property Requests</Text>
                                    {leads.map((lead, index) => (
                                        <LeadCard key={lead.propertyId || index} property={lead} />
                                    ))}
                                </>
                            )}

                            {/* Customer Questions */}
                            {customerQuestions.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>Customer Questions</Text>
                                    {customerQuestions.map((question, index) => (
                                        <CustomerQuestionCard key={question.id || index} question={question} />
                                    ))}
                                </>
                            )}

                            {/* Financial Requests */}
                            {financialRequests.length > 0 && (
                                <>
                                    <Text style={styles.sectionTitle}>Financial Requests</Text>
                                    {financialRequests.map((request, index) => (
                                        <FinancialRequestCard key={request.id || index} request={request} />
                                    ))}
                                </>
                            )}
                        </>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="people-outline" size={80} color="#ccc" />
                            <Text style={styles.emptyText}>No leads yet</Text>
                            <Text style={styles.emptySubtext}>
                                You don't have any property requests, customer questions, or financial requests at the moment.
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginTop: 24,
        marginBottom: 12,
    },
    questionBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    questionBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#DD7800',
    },
    financialBadge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    financialBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#10B981',
    },
    contactInfo: {
        marginTop: 12,
        marginBottom: 12,
        gap: 8,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#666',
    },
    agentInfo: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    agentLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#999',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    agentName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    agentContact: {
        fontSize: 13,
        color: '#666',
    },
    financialDetails: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    financialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    financialLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    financialValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#10B981',
    },
    propertySection: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFEDD5',
    },
    propertySectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    propertyRowCompact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    propertyInfoCompact: {
        flex: 1,
        paddingRight: 12,
    },
    propertyNameCompact: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    propertyAddressCompact: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    propertyPriceCompact: {
        fontSize: 18,
        fontWeight: '700',
        color: '#DD7800',
    },
    propertyImageSmall: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    customerInfo: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    customerLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#999',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    customerEmail: {
        fontSize: 14,
        color: '#666',
    },
});
