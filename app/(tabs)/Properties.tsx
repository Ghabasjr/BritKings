import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    deleteProperty,
    getPropertyById,
    searchProperties,
    SearchPropertiesParams,
    updateProperty
} from '@/store/slices/propertiesSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function PropertiesPage() {
    const dispatch = useAppDispatch();
    const { properties, isLoading } = useAppSelector((state) => state.properties);
    const [filters, setFilters] = useState<SearchPropertiesParams>({
        name: '',
        price: 0,
        size: '',
        status: undefined,
        page: 1,
        limit: 10,
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [formData, setFormData] = useState({
        price: '',
        status: '',
        bedrooms: '',
        bathroom: '',
        size: '',
        parking: '',
    });


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await dispatch(searchProperties({ page: 1, limit: 10 })).unwrap();
            } catch (error) {
                console.error("Failed to fetch properties", error);
            }
        };

        fetchProperties();
    }, [dispatch]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            handleSearch();
        }, 500); // Debounce search by 500ms

        return () => clearTimeout(delaySearch);
    }, [filters]);

    const loadProperties = async () => {
        try {
            await dispatch(searchProperties(filters)).unwrap();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Load Properties',
                text2: error || 'Please try again',
            });
        }
    };

    const handleSearch = async () => {
        try {
            const params: any = {};
            if (filters.name) params.name = filters.name;
            if (filters.price) params.price = Number(filters.price);
            if (filters.size) params.size = filters.size;
            if (filters.status) params.status = filters.status;
            if (filters.page) params.page = filters.page;
            if (filters.limit) params.limit = filters.limit;

            await dispatch(searchProperties(params)).unwrap();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Search Failed',
                text2: error || 'Please try again',
            });
        }
    };

    const handleCreateProperty = () => router.push('/newListing');

    const handleUpdateProperty = async () => {
        try {
            const updateData: any = { id: selectedProperty.propertyId };

            if (formData.price) updateData.price = Number(formData.price);
            if (formData.status) updateData.status = formData.status;
            if (formData.bedrooms) updateData.bedrooms = Number(formData.bedrooms);
            if (formData.bathroom) updateData.bathroom = Number(formData.bathroom);
            if (formData.size) updateData.size = formData.size;
            if (formData.parking) updateData.parking = Number(formData.parking);

            const result = await dispatch(updateProperty(updateData)).unwrap();

            Toast.show({
                type: 'success',
                text1: 'Property Updated',
                text2: result?.responseMessage || 'Property updated successfully',
            });
            setUpdateModalVisible(false);
            loadProperties();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Update Property',
                text2: error || 'Please try again',
            });
        }
    };

    const handleDeleteProperty = async (propertyId: string) => {
        try {
            const result = await dispatch(deleteProperty(propertyId)).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Property Deleted',
                text2: result?.responseMessage || 'Property deleted successfully',
            });
            loadProperties();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Delete Property',
                text2: error || 'Please try again',
            });
        }
    };

    const handleViewProperty = async (propertyId: string) => {
        try {
            const result = await dispatch(getPropertyById(propertyId)).unwrap();
            console.log('Property details:', result);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Load Property',
                text2: error || 'Please try again',
            });
        }
    };

    // 🔹 Extract property array safely from API shape
    const propertyList = properties || [];

    const renderPropertyItem = ({ item }: { item: any }) => (
        <View style={styles.propertyCard}>
            <View style={styles.propertyInfo}>
                <Text style={styles.propertyTitle}>{item.name}</Text>
                <Text style={styles.propertyDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.propertyDetails}>
                    <Text style={styles.propertyPrice}>₦{item.price?.toLocaleString()}</Text>
                    <Text style={styles.propertyLocation}>{item.address}</Text>
                </View>
                {(item.bedrooms || item.bathroom) && (
                    <Text style={styles.propertySpecs}>
                        {item.bedrooms && `${item.bedrooms} bed `}
                        {item.bathroom && `• ${item.bathroom} bath `}
                        {item.size && `• ${item.size} m² `}
                        {item.parking && `• ${item.parking} parking`}
                    </Text>
                )}
                <View style={styles.propertyStatus}>
                    <Text style={[
                        styles.statusBadge,
                        item.status === 'AVAILABLE' && styles.statusAvailable,
                        item.status === 'SOLD' && styles.statusSold,
                        item.status === 'RENTED' && styles.statusRented,
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <View style={styles.propertyActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        setSelectedProperty(item);
                        setUpdateModalVisible(true);
                    }}
                // onPress={() => handleViewProperty(item.propertyId)}
                >
                    <Ionicons name="eye" size={20} color="#DD7800" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        setSelectedProperty(item);
                        setFormData({
                            price: item.price?.toString() || '',
                            status: item.status || '',
                            bedrooms: item.bedrooms?.toString() || '',
                            bathroom: item.bathroom?.toString() || '',
                            size: item.size || '',
                            parking: item.parking?.toString() || '',
                        });
                        setUpdateModalVisible(true);
                    }}
                >
                    <Ionicons name="pencil" size={20} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteProperty(item.propertyId)}
                >
                    <Ionicons name="trash" size={20} color="#FF3B30" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Properties</Text>
                <TouchableOpacity onPress={handleCreateProperty}>
                    <Ionicons name="add-circle" size={28} color="#DD7800" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color="#888" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            setFilters({ ...filters, name: text });
                        }} onSubmitEditing={handleSearch}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
                    <Ionicons name="options" size={24} color="#DD7800" />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#DD7800" />
                </View>
            ) : (
                <FlatList
                    data={propertyList}
                    renderItem={renderPropertyItem}
                    keyExtractor={(item) => item.propertyId?.toString() || item.id?.toString() || Math.random().toString()}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="home-outline" size={64} color="#ccc" />
                            <Text style={styles.emptyText}>No properties found</Text>
                            <TouchableOpacity
                                style={styles.createButton}
                                onPress={handleCreateProperty}
                            >
                                <Text style={styles.createButtonText}>Create Property</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />

            )}

            {/* Filter Modal */}
            <Modal
                visible={filterModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filter Properties</Text>
                            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Maximum Price</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter maximum price"
                                    value={filters.price?.toString() || ''}
                                    onChangeText={(text) => setFilters({ ...filters, price: text ? Number(text) : 0 })}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Size</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter size (e.g., 100m²)"
                                    value={filters.size || ''}
                                    onChangeText={(text) => setFilters({ ...filters, size: text })}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.statusButtons}>
                                    <TouchableOpacity
                                        style={[
                                            styles.statusButton,
                                            !filters.status && styles.statusButtonActive
                                        ]}
                                        onPress={() => setFilters({ ...filters, status: undefined })}
                                    >
                                        <Text style={[
                                            styles.statusButtonText,
                                            !filters.status && styles.statusButtonTextActive
                                        ]}>
                                            ALL
                                        </Text>
                                    </TouchableOpacity>
                                    {['AVAILABLE', 'SOLD'].map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[
                                                styles.statusButton,
                                                filters.status === status && styles.statusButtonActive
                                            ]}
                                            onPress={() => setFilters({ ...filters, status: status as any })}
                                        >
                                            <Text style={[
                                                styles.statusButtonText,
                                                filters.status === status && styles.statusButtonTextActive
                                            ]}>
                                                {status}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setFilters({
                                        name: '',
                                        price: 0,
                                        size: '',
                                        status: undefined,
                                        page: 1,
                                        limit: 10,
                                    });
                                    setSearchQuery('');
                                    setFilterModalVisible(false);
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Clear All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={() => setFilterModalVisible(false)}
                            >
                                <Text style={styles.updateButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Update Property Modal */}
            <Modal
                visible={updateModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setUpdateModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Update Property</Text>
                            <TouchableOpacity onPress={() => setUpdateModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Price</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChangeText={(text) => setFormData({ ...formData, price: text })}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.statusButtons}>
                                    {['AVAILABLE', 'SOLD'].map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[
                                                styles.statusButton,
                                                formData.status === status && styles.statusButtonActive
                                            ]}
                                            onPress={() => setFormData({ ...formData, status })}
                                        >
                                            <Text style={[
                                                styles.statusButtonText,
                                                formData.status === status && styles.statusButtonTextActive
                                            ]}>
                                                {status}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Bedrooms</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Number of bedrooms"
                                    value={formData.bedrooms}
                                    onChangeText={(text) => setFormData({ ...formData, bedrooms: text })}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Bathrooms</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Number of bathrooms"
                                    value={formData.bathroom}
                                    onChangeText={(text) => setFormData({ ...formData, bathroom: text })}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Size (m²)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Property size"
                                    value={formData.size}
                                    onChangeText={(text) => setFormData({ ...formData, size: text })}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Parking Spaces</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Number of parking spaces"
                                    value={formData.parking}
                                    onChangeText={(text) => setFormData({ ...formData, parking: text })}
                                    keyboardType="numeric"
                                />
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setUpdateModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={handleUpdateProperty}
                            >
                                <Text style={styles.updateButtonText}>Update</Text>
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
        backgroundColor: '#F5F5F5',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        gap: 12,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    filterButton: {
        padding: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    propertyInfo: {
        flex: 1,
    },
    propertyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    propertyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    propertyDetails: {
        marginBottom: 8,
    },
    propertyPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DD7800',
        marginBottom: 4,
    },
    propertyLocation: {
        fontSize: 14,
        color: '#666',
    },
    propertySpecs: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    propertyStatus: {
        flexDirection: 'row',
        gap: 8,
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusAvailable: {
        backgroundColor: '#E8F5E9',
        color: '#4CAF50',
    },
    statusSold: {
        backgroundColor: '#FFEBEE',
        color: '#F44336',
    },
    statusRented: {
        backgroundColor: '#E3F2FD',
        color: '#2196F3',
    },
    typeBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#F5F5F5',
        color: '#666',
    },
    propertyActions: {
        justifyContent: 'center',
        gap: 12,
        marginLeft: 12,
    },
    actionButton: {
        padding: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 16,
        marginBottom: 24,
    },
    createButton: {
        backgroundColor: '#DD7800',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalBody: {
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    statusButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    statusButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    statusButtonActive: {
        backgroundColor: '#DD7800',
        borderColor: '#DD7800',
    },
    statusButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    statusButtonTextActive: {
        color: '#fff',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    updateButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#DD7800',
        alignItems: 'center',
    },
    updateButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
