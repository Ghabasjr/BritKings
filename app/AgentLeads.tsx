// import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Toast from 'react-native-toast-message';

// // Lead Card Component - Shows requested properties
// const LeadCard = ({ property, onViewDetails, onContactClient }: any) => (
//     <View style={cardStyles.card}>
//         <View style={cardStyles.imageContainer}>
//             <Image
//                 source={{ uri: property.propertyImageUrl || 'https://placehold.co/600x400/e0e0e0/555?text=Property' }}
//                 style={cardStyles.image}
//             />
//             <View style={cardStyles.statusBadge}>
//                 <View style={cardStyles.statusDot} />
//                 <Text style={cardStyles.statusText}>New Lead</Text>
//             </View>
//         </View>

//         <View style={cardStyles.content}>
//             <View style={cardStyles.headerRow}>
//                 <Text style={cardStyles.propertyName} numberOfLines={1}>{property.name}</Text>
//                 <View style={[cardStyles.availabilityTag, !property.available && cardStyles.unavailableTag]}>
//                     <Text style={cardStyles.availabilityText}>
//                         {property.available ? 'Available' : 'Unavailable'}
//                     </Text>
//                 </View>
//             </View>

//             <View style={cardStyles.locationRow}>
//                 <Ionicons name="location" size={16} color="#DD7800" />
//                 <Text style={cardStyles.locationText} numberOfLines={1}>{property.address}</Text>
//             </View>

//             <View style={cardStyles.priceRow}>
//                 <Text style={cardStyles.price}>${property.price?.toLocaleString()}</Text>
//                 <View style={cardStyles.statusTag}>
//                     <Text style={cardStyles.statusTagText}>{property.status}</Text>
//                 </View>
//             </View>

//             <View style={cardStyles.detailsGrid}>
//                 <View style={cardStyles.detailItem}>
//                     <Ionicons name="bed-outline" size={20} color="#666" />
//                     <Text style={cardStyles.detailText}>{property.bedrooms}</Text>
//                     <Text style={cardStyles.detailLabel}>Beds</Text>
//                 </View>
//                 <View style={cardStyles.detailItem}>
//                     <Ionicons name="water-outline" size={20} color="#666" />
//                     <Text style={cardStyles.detailText}>{property.bathroom}</Text>
//                     <Text style={cardStyles.detailLabel}>Baths</Text>
//                 </View>
//                 <View style={cardStyles.detailItem}>
//                     <Ionicons name="resize-outline" size={20} color="#666" />
//                     <Text style={cardStyles.detailText}>{property.size}</Text>
//                     <Text style={cardStyles.detailLabel}>sqft</Text>
//                 </View>
//                 {property.parking && (
//                     <View style={cardStyles.detailItem}>
//                         <Ionicons name="car-outline" size={20} color="#666" />
//                         <Text style={cardStyles.detailText}>{property.parking}</Text>
//                         <Text style={cardStyles.detailLabel}>Parking</Text>
//                     </View>
//                 )}
//             </View>

//             {property.description && (
//                 <Text style={cardStyles.description} numberOfLines={2}>
//                     {property.description}
//                 </Text>
//             )}

//             <View style={cardStyles.timeRow}>
//                 <Ionicons name="time-outline" size={14} color="#999" />
//                 <Text style={cardStyles.timeText}>
//                     Requested: {new Date(property.createdAt).toLocaleDateString()} at {new Date(property.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </Text>
//             </View>

//             {/* Action Buttons */}
//             <View style={cardStyles.buttonRow}>
//                 <TouchableOpacity
//                     style={cardStyles.viewButton}
//                     onPress={() => onViewDetails(property)}
//                 >
//                     <Ionicons name="eye-outline" size={18} color="#DD7800" />
//                     <Text style={cardStyles.viewButtonText}>View Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={cardStyles.contactButton}
//                     onPress={() => onContactClient(property)}
//                 >
//                     <Ionicons name="call-outline" size={18} color="#fff" />
//                     <Text style={cardStyles.contactButtonText}>Contact Client</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </View>
// );

// const cardStyles = StyleSheet.create({
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//         elevation: 5,
//         overflow: 'hidden',
//         borderWidth: 1,
//         borderColor: '#f0f0f0',
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         height: 220,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     statusBadge: {
//         position: 'absolute',
//         top: 16,
//         left: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'rgba(76, 175, 80, 0.95)',
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//         borderRadius: 20,
//         gap: 6,
//     },
//     statusDot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: '#fff',
//     },
//     statusText: {
//         fontSize: 12,
//         fontWeight: '700',
//         color: '#fff',
//         textTransform: 'uppercase',
//     },
//     content: {
//         padding: 16,
//     },
//     headerRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: 8,
//         gap: 8,
//     },
//     propertyName: {
//         flex: 1,
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#1a1a1a',
//     },
//     availabilityTag: {
//         backgroundColor: '#4CAF50',
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     unavailableTag: {
//         backgroundColor: '#F44336',
//     },
//     availabilityText: {
//         fontSize: 11,
//         fontWeight: '600',
//         color: '#fff',
//     },
//     locationRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6,
//         marginBottom: 12,
//     },
//     locationText: {
//         flex: 1,
//         fontSize: 14,
//         color: '#666',
//     },
//     priceRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     price: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#DD7800',
//     },
//     statusTag: {
//         backgroundColor: '#FFF3E0',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 8,
//     },
//     statusTagText: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: '#DD7800',
//     },
//     detailsGrid: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         paddingVertical: 16,
//         backgroundColor: '#F9F9F9',
//         borderRadius: 12,
//         marginBottom: 12,
//     },
//     detailItem: {
//         alignItems: 'center',
//         gap: 4,
//     },
//     detailText: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: '#333',
//     },
//     detailLabel: {
//         fontSize: 12,
//         color: '#999',
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         lineHeight: 20,
//         marginBottom: 12,
//     },
//     timeRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6,
//         marginBottom: 16,
//         paddingTop: 12,
//         borderTopWidth: 1,
//         borderTopColor: '#F0F0F0',
//     },
//     timeText: {
//         fontSize: 12,
//         color: '#999',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         gap: 12,
//     },
//     viewButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 6,
//         borderWidth: 2,
//         borderColor: '#DD7800',
//         borderRadius: 30,
//         paddingVertical: 14,
//         backgroundColor: '#fff',
//     },
//     viewButtonText: {
//         fontSize: 15,
//         fontWeight: '600',
//         color: '#DD7800',
//     },
//     contactButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 6,
//         backgroundColor: '#DD7800',
//         borderRadius: 30,
//         paddingVertical: 14,
//         shadowColor: '#DD7800',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//         elevation: 4,
//     },
//     contactButtonText: {
//         fontSize: 15,
//         fontWeight: '600',
//         color: '#fff',
//     },
// });

// interface RequestedProperty {
//     propertyId: string;
//     name: string;
//     address: string;
//     description: string;
//     size: number;
//     bedrooms: string;
//     parking: string;
//     bathroom: string;
//     pools: string;
//     price: number;
//     status: string;
//     propertyImageUrl: string;
//     available: boolean;
//     createdAt: string;
//     updatedAt: string;
//     deleted: boolean;
// }

// export default function AgentLeadsPage() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [activeFilter, setActiveFilter] = useState('all');
//     const [leads, setLeads] = useState<RequestedProperty[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [filteredLeads, setFilteredLeads] = useState<RequestedProperty[]>([]);

//     // Fetch requested properties on mount
//     useEffect(() => {
//         fetchRequestedProperties();
//     }, []);

//     // Filter leads based on search query and active filter
//     useEffect(() => {
//         let filtered = leads;

//         // Apply status filter
//         if (activeFilter !== 'all') {
//             if (activeFilter === 'available') {
//                 filtered = filtered.filter(p => p.available);
//             } else if (activeFilter === 'unavailable') {
//                 filtered = filtered.filter(p => !p.available);
//             } else if (activeFilter === 'recent') {
//                 // Filter properties from last 7 days
//                 const sevenDaysAgo = new Date();
//                 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//                 filtered = filtered.filter(p => new Date(p.createdAt) >= sevenDaysAgo);
//             } else {
//                 filtered = filtered.filter(p => p.status.toLowerCase() === activeFilter.toLowerCase());
//             }
//         }

//         // Apply search filter
//         if (searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(property =>
//                 property.name.toLowerCase().includes(query) ||
//                 property.address.toLowerCase().includes(query) ||
//                 property.description.toLowerCase().includes(query)
//             );
//         }

//         // Sort by most recent first
//         filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//         setFilteredLeads(filtered);
//     }, [searchQuery, leads, activeFilter]);

//     const fetchRequestedProperties = async () => {
//         setIsLoading(true);
//         try {
//             // Get auth token and user data
//             const token = await AsyncStorage.getItem('authToken');
//             const userDataString = await AsyncStorage.getItem('userData');

//             if (!token) {
//                 throw new Error('Authentication token not found. Please login again.');
//             }

//             // Get agentId from user data
//             let agentId = '';
//             if (userDataString) {
//                 try {
//                     const userData = JSON.parse(userDataString);
//                     agentId = userData.agentId || userData.id || '';
//                 } catch (e) {
//                     console.error('Failed to parse user data:', e);
//                 }
//             }

//             if (!agentId) {
//                 throw new Error('Agent ID not found. Please login again.');
//             }

//             // Replace {agentId} in endpoint
//             const endpoint = AGENT_AUTH_ENDPOINTS.REQUESTED_PROPERTIES.replace('{agentId}', agentId);

//             console.log('Fetching requested properties from:', `${BASE_URL}${endpoint}`);

//             const response = await fetch(`${BASE_URL}${endpoint}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             console.log('Requested properties response status:', response.status);

//             let result;
//             try {
//                 result = await response.json();
//                 console.log('Requested properties response:', result);
//             } catch (parseError) {
//                 console.error('Failed to parse response:', parseError);
//                 throw new Error('Invalid server response');
//             }

//             if (!response.ok || result.responseCode !== '00') {
//                 const errorMessage = result?.responseMessage || result?.message || 'Failed to fetch leads';
//                 throw new Error(errorMessage);
//             }

//             // Set properties from responseData
//             const leadsData = result.responseData || [];
//             setLeads(leadsData);
//             setFilteredLeads(leadsData);

//             Toast.show({
//                 type: 'success',
//                 text1: 'Leads Loaded',
//                 text2: `Found ${leadsData.length} new lead${leadsData.length !== 1 ? 's' : ''}`,
//             });
//         } catch (error: any) {
//             console.error('Fetch requested properties error:', error);
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: error.message || 'Failed to load leads',
//             });
//             setLeads([]);
//             setFilteredLeads([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleViewDetails = (property: RequestedProperty) => {
//         // Navigate to property details page
//         router.push({
//             pathname: '/PropertyDetails',
//             params: { propertyId: property.propertyId }
//         });
//     };

//     const handleContactClient = (property: RequestedProperty) => {
//         // Show contact options or navigate to contact page
//         Toast.show({
//             type: 'info',
//             text1: 'Contact Client',
//             text2: `Contacting client for ${property.name}`,
//         });

//         // You can implement actual contact functionality here
//         // For example: router.push('/ContactClient', { propertyId: property.propertyId });
//     };

//     const filterOptions = [
//         { label: 'All Leads', value: 'all', icon: 'list-outline' },
//         { label: 'Recent', value: 'recent', icon: 'time-outline' },
//         { label: 'Available', value: 'available', icon: 'checkmark-circle-outline' },
//         { label: 'Unavailable', value: 'unavailable', icon: 'close-circle-outline' },
//     ];

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//                     <Ionicons name="chevron-back" size={28} color="#DD7800" />
//                 </TouchableOpacity>
//                 <View style={styles.headerCenter}>
//                     <Text style={styles.headerTitle}>Leads</Text>
//                     <Text style={styles.headerSubtitle}>Requested Properties</Text>
//                 </View>
//                 <TouchableOpacity
//                     style={styles.refreshButton}
//                     onPress={fetchRequestedProperties}
//                 >
//                     <Ionicons name="refresh-outline" size={24} color="#333" />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView
//                 style={styles.scrollView}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 100 }}
//             >
//                 <View style={styles.container}>
//                     {/* Stats Card */}
//                     <View style={styles.statsCard}>
//                         <View style={styles.statItem}>
//                             <Ionicons name="people" size={24} color="#DD7800" />
//                             <Text style={styles.statNumber}>{leads.length}</Text>
//                             <Text style={styles.statLabel}>Total Leads</Text>
//                         </View>
//                         <View style={styles.statDivider} />
//                         <View style={styles.statItem}>
//                             <Ionicons name="checkmark-done" size={24} color="#4CAF50" />
//                             <Text style={styles.statNumber}>
//                                 {leads.filter(l => l.available).length}
//                             </Text>
//                             <Text style={styles.statLabel}>Available</Text>
//                         </View>
//                         <View style={styles.statDivider} />
//                         <View style={styles.statItem}>
//                             <Ionicons name="time" size={24} color="#2196F3" />
//                             <Text style={styles.statNumber}>
//                                 {leads.filter(l => {
//                                     const sevenDaysAgo = new Date();
//                                     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//                                     return new Date(l.createdAt) >= sevenDaysAgo;
//                                 }).length}
//                             </Text>
//                             <Text style={styles.statLabel}>This Week</Text>
//                         </View>
//                     </View>

//                     {/* Search Bar */}
//                     <View style={styles.searchContainer}>
//                         <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search leads by name, address..."
//                             placeholderTextColor="#888"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                         />
//                         {searchQuery.length > 0 && (
//                             <TouchableOpacity onPress={() => setSearchQuery('')}>
//                                 <Ionicons name="close-circle" size={20} color="#888" />
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* Filter Chips */}
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         style={styles.filterContainer}
//                         contentContainerStyle={styles.filterContent}
//                     >
//                         {filterOptions.map((option) => (
//                             <TouchableOpacity
//                                 key={option.value}
//                                 style={[
//                                     styles.filterChip,
//                                     activeFilter === option.value && styles.filterChipActive
//                                 ]}
//                                 onPress={() => setActiveFilter(option.value)}
//                             >
//                                 <Ionicons
//                                     name={option.icon as any}
//                                     size={16}
//                                     color={activeFilter === option.value ? '#fff' : '#666'}
//                                 />
//                                 <Text
//                                     style={[
//                                         styles.filterChipText,
//                                         activeFilter === option.value && styles.filterChipTextActive
//                                     ]}
//                                 >
//                                     {option.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     {/* Leads Count */}
//                     <View style={styles.countContainer}>
//                         <Text style={styles.countText}>
//                             {filteredLeads.length} {filteredLeads.length === 1 ? 'Lead' : 'Leads'}
//                         </Text>
//                         {searchQuery && (
//                             <Text style={styles.countSubtext}>
//                                 matching "{searchQuery}"
//                             </Text>
//                         )}
//                     </View>

//                     {/* Lead Cards */}
//                     <View style={styles.leadsList}>
//                         {isLoading ? (
//                             <View style={styles.loadingContainer}>
//                                 <ActivityIndicator size="large" color="#DD7800" />
//                                 <Text style={styles.loadingText}>Loading leads...</Text>
//                             </View>
//                         ) : filteredLeads.length > 0 ? (
//                             filteredLeads.map((property, index) => (
//                                 <LeadCard
//                                     key={property.propertyId || index}
//                                     property={property}
//                                     onViewDetails={handleViewDetails}
//                                     onContactClient={handleContactClient}
//                                 />
//                             ))
//                         ) : (
//                             <View style={styles.emptyContainer}>
//                                 <Ionicons name="people-outline" size={80} color="#ccc" />
//                                 <Text style={styles.emptyText}>No leads found</Text>
//                                 <Text style={styles.emptySubtext}>
//                                     {searchQuery
//                                         ? 'Try adjusting your search or filters'
//                                         : 'You don\'t have any requested properties yet'}
//                                 </Text>
//                                 {!searchQuery && (
//                                     <TouchableOpacity
//                                         style={styles.emptyButton}
//                                         onPress={fetchRequestedProperties}
//                                     >
//                                         <Ionicons name="refresh" size={20} color="#fff" />
//                                         <Text style={styles.emptyButtonText}>Refresh Leads</Text>
//                                     </TouchableOpacity>
//                                 )}
//                             </View>
//                         )}
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//         paddingTop: 25,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//         backgroundColor: '#fff',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     backButton: {
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     headerCenter: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#1a1a1a',
//     },
//     headerSubtitle: {
//         fontSize: 12,
//         color: '#999',
//         marginTop: 2,
//     },
//     refreshButton: {
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     scrollView: {
//         flex: 1,
//     },
//     container: {
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     statsCard: {
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.08,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     statItem: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     statNumber: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#1a1a1a',
//         marginTop: 8,
//     },
//     statLabel: {
//         fontSize: 12,
//         color: '#999',
//         marginTop: 4,
//     },
//     statDivider: {
//         width: 1,
//         backgroundColor: '#E0E0E0',
//         marginHorizontal: 12,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         paddingHorizontal: 16,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.05,
//         shadowRadius: 8,
//         elevation: 2,
//     },
//     searchIcon: {
//         marginRight: 12,
//     },
//     searchInput: {
//         flex: 1,
//         height: 50,
//         fontSize: 16,
//         color: '#333',
//     },
//     filterContainer: {
//         marginBottom: 16,
//     },
//     filterContent: {
//         gap: 8,
//     },
//     filterChip: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6,
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         borderRadius: 20,
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#E0E0E0',
//     },
//     filterChipActive: {
//         backgroundColor: '#DD7800',
//         borderColor: '#DD7800',
//     },
//     filterChipText: {
//         fontSize: 14,
//         color: '#666',
//         fontWeight: '500',
//     },
//     filterChipTextActive: {
//         color: '#fff',
//     },
//     countContainer: {
//         marginBottom: 16,
//     },
//     countText: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#333',
//     },
//     countSubtext: {
//         fontSize: 14,
//         color: '#999',
//         marginTop: 4,
//     },
//     leadsList: {
//         marginBottom: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 60,
//     },
//     loadingText: {
//         marginTop: 16,
//         fontSize: 16,
//         color: '#666',
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 60,
//     },
//     emptyText: {
//         marginTop: 16,
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//     },
//     emptySubtext: {
//         marginTop: 8,
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center',
//         paddingHorizontal: 40,
//     },
//     emptyButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//         backgroundColor: '#DD7800',
//         paddingHorizontal: 24,
//         paddingVertical: 12,
//         borderRadius: 25,
//         marginTop: 20,
//     },
//     emptyButtonText: {
//         fontSize: 15,
//         fontWeight: '600',
//         color: '#fff',
//     },
// });
